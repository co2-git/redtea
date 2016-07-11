// @flow
import {EventEmitter} from 'events';
import _ from 'lodash';
import is, {Is} from './is';


function describeIt() {

}

function describePromise(promise: Promise, ...describers: Array<Function>) {
  promise.then(describeIt, describeIt);
}

function describeEmitter() {

}

// `describe` returns an emitter that will emit the following events:
// - "describe" (subject: any) this event is triggered to show test has begun
// - "done" (results: Array<Is>)

export function describe(
  subject: any,
  ...describers: Array<Function>
  ): EventEmitter {
  // Separate functions from ocnfigurations
  const functions = describers.filter(
    (describer: DescriberType): boolean => typeof describer === 'function'
  );
  const options = describers.filter(
    (describer: DescriberType): boolean => typeof describer === 'object'
  );
  // The test emitter
  const emitter = new EventEmitter();
  // The function to emit
  const emit = (event: string, ...messages: Array<any>) =>
  // (running in next tick because that's the way emitters work but if we run
  //  the whole test in next tick, we might miss events in the current tick)
    process.nextTick(() => {
      emitter.emit(event, ...messages);
    }
  );
  // the function to run describers on a subject. Note that it is curried
  // because a blocking subject will call it asynchronously
  const run = (_subject: any) => {
    // In case there are asynchronous events to wait for, we put a counter here.
    // Like this, when an asynchronous event is done, we know if there are more
    //  to wait for.
    // So this variable below acts like a pseudo generator that will assign
    //  unique keys to each actions.
    type CursorType = number;
    let waitForCursor: CursorType = 0;
    // This array will contain all the unique ids
    let waitFor: Array<CursorType> = [];
    // The function that is called everytime a specific describer is done.
    // It will decide if describer was the last one of the list
    //  - if so, it will exit the test as done.
    const done = () => {
      if (!waitFor.length) {
        emit('done', results, options);
      }
    };
    // tell listeners we are beginning the test
    emit('describe', _subject, options);
    // the results of the test go here
    const results: Array<Is> = [];
    // Testing each describer on the subject
    functions.forEach((describer: Function) => {
      // The result of this particular describer
      // We expect two kind of results here:
      // - a Is (it is a regular describer)
      // - a Listener (we want to describer an emitter's events)
      const result: Is | Listener = describer(_subject);
      // If we have a listener, we need to listen to subject's event
      if (result instanceof Listener) {
        console.log('I am an emitter');
        // We need to make sure subject is an emitter.
        // We issue a test failure otherwise.
        if (!(_subject instanceof EventEmitter)) {
          const notAnEmitter = new Is(
            `is emitting "${result.event}"`,
            _subject,
            {
              event: result.event,
              passed: false,
              error: new Error('Subject is not an emitter')
            }
          );
          results.push(notAnEmitter);
        } else {
          // the unique key for this describer
          const eventCursor = waitForCursor++;
          // we add unique key to list of unique keys
          waitFor.push(eventCursor);
          // They are 2 types: should emit AND should not emit.
          // First, deal with "should not emit"
          if (result.not) {
            console.log('is not', result);
            // a unique id
            const didNotEmitKey = waitForCursor++;
            // a timer that will succeed if event not emitted
            const shouldNotEmit = setTimeout(() => {
              console.log('i am in settimeotu', _subject);
              const okDidNotEmit: Is = new Is(
                `is not emitting "${result.event}"`,
                _subject,
                {
                  event: result.event,
                  passed: true,
                }
              );
              emit('passed', okDidNotEmit);
              waitFor = _.without(waitFor, didNotEmitKey);
              done();
            }, 2500);
            // We put a listener that would trigger a fail if emitted
            _subject.once(result.event, () => {
              console.log('should not emit', result);
              clearTimeout(shouldNotEmit);
              const failDidNotEmit: Is = new Is(
                `is not emitting "${result.event}"`,
                _subject,
                {
                  event: result.event,
                  passed: false,
                }
              );
              emit('passed', failDidNotEmit);
              waitFor = _.without(waitFor, didNotEmitKey);
              done();
            });
          } else {
            // now we listen to subject's event
            _subject.once(result.event, (...messages: Array<any>) => {
              // since event did get triggered, we remove it for our queue
              waitFor = _.without(waitFor, eventCursor);
              // if we just want to listen an event and we don't care about what
              //  is emitted, good enough: test is passed!
              if (!result.checkers.length) {
                const eventResult = new Is(
                  `is emitting "${result.event}"`,
                  _subject,
                  {
                    event: result.event,
                    messages,
                    passed: true,
                  }
                );
                emit('passed', eventResult);
                results.push(eventResult);
                done();
              } else {
                // We now run each describer which will return emitters
                result.checkers.forEach(
                  (checker: Function) => {
                    const subEmitter: EventEmitter = checker(...messages);
                    // we add unique keys also to our sub emitters
                    const subEmitterKey = waitForCursor++;
                    subEmitter
                      .on('describe', (subSubject: any): boolean => emitter
                        .emit('describe', subSubject)
                      )
                      .on('passed', (subResults: Array<Is>): boolean => emitter
                        .emit('passed', subResults)
                      )
                      .on('failed', (subResults: Array<Is>): boolean => emitter
                        .emit('failed', subResults)
                      )
                      .on('done', (subResults: Array<Is>) => {
                        emitter.emit('done', subResults);
                        waitFor = _.without(waitFor, subEmitterKey);
                        done();
                      });
                  }
                );
              }
            });
          }
        }
      } else {
        if (result.passed) {
          emit('passed', result);
        } else if (result.passed === false) {
          emit('failed', result);
        }
        results.push(result);
      }
    });
    done();
  };
  if (subject instanceof Promise) {
    subject.then(run, run);
  } else {
    run(subject);
  }
  return emitter;
}

type DescriberType = Function | Object;

function batch(
  label: string,
  ...describers: Array<DescriberType>
  ): EventEmitter {
  const functions: Array<Function> = describers.filter(
    (describer: Function | Object): boolean => typeof describer === 'function'
  );
  const emitter = new EventEmitter();
  process.nextTick(() => {
    emitter.emit('batch', label);
    if (!functions.length) {
      emitter.emit('done', []);
      return;
    }
    const subResults = [];
    const isDone = () => {
      if (subResults.length === functions.length) {
        emitter.emit('done', subResults);
      }
    };
    functions.forEach((fn: Function) => {
      const describer = fn();
      describer
        .on('batch', (describerLabel: string): boolean =>
            emitter.emit('batch', describerLabel))
        .on('describe',
          (subject: string, options: Array<Object> = []): boolean =>
            emitter.emit('describe', subject, options)
        )
        .on('passed', (results: Is): boolean => emitter.emit('passed', results))
        .on('failed', (results: Is): boolean => emitter.emit('failed', results))
        .on('done', (results: Array<Is>): boolean =>
          emitter.emit('_done', results))
        .on('done', (results: Array<Is>) => {
          subResults.push(results);
          isDone();
        });
    });
  });
  return emitter;
}

describe.batch = batch;
