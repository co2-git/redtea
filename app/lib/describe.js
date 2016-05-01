// @flow
import {EventEmitter} from 'events';
import _ from 'lodash';
import is, {Is} from './is';

class Listener {
  event: string;
  checkers: Array<Function> = [];
  not: boolean = false;

  constructor(event: string, checkers: Array<Function>, not: boolean = false) {
    this.event = event;
    this.checkers = checkers;
    this.not = not;
  }
}

function itIs(value: any): Function {
  return (subject: any): Is => is(subject, value);
}

function itIsNot(value: any): Function {
  return (subject: any): Is => is.not(subject, value);
}

function itIsA(type: Function): Function {
  return (subject: any): Is => is.type(subject, type);
}

function itIsNotA(value: any): Function {
  return (subject: any): Is => is.not.type(subject, value);
}

function emits(event: string, ...checkers: Array<Function>): Function {
  return (): Listener => new Listener(event, checkers);
}

function doesNotEmit(event: string): Function {
  return (): Listener => new Listener(event, [], true);
}

export const it = {
  is: itIs,
  emits,
  does: {
    not: {
      emit: doesNotEmit,
    },
  },
};

it.is.true = itIs(true);
it.is.false = itIs(false);
it.is.null = itIs(null);
it.is.undefined = itIs(undefined);

it.is.not = itIsNot;

it.is.not.true = itIsNot(true);
it.is.not.false = itIsNot(false);
it.is.not.null = itIsNot(null);
it.is.not.undefined = itIsNot(undefined);

const aa = 'a';
it.is[aa] = itIsA;
it.is.an = itIsA;
it.is.a.string = itIsA(String);
it.is.a.number = itIsA(Number);
it.is.a.boolean = itIsA(Boolean);
it.is.a.date = itIsA(Date);
it.is.a.promise = itIsA(Promise);
it.is.a.function = itIsA(Function);
it.is.a.regular = {expression: itIsA(RegExp)};
it.is.an.emitter = itIsA(EventEmitter);
it.is.an.error = itIsA(Error);
it.is.an.object = itIsA(Object);
it.is.an.array = itIsA(Array);
it.is.not[aa] = itIsNotA;
it.is.not.an = itIsNotA;
it.is.not.an.error = itIsNotA(Error);
it.is.not.a.string = itIsNotA(String);
it.is.not.a.number = itIsNotA(Number);
it.is.not.a.function = itIsNotA(Function);
it.is.not.a.boolean = itIsNotA(Boolean);
it.is.not.an.object = itIsNotA(Object);
it.is.not.an.array = itIsNotA(Array);
it.is.not.an.emitter = itIsNotA(EventEmitter);
it.is.not.a.promise = itIsNotA(Promise);
it.is.not.a.date = itIsNotA(Date);
it.is.not.a.regular = {expression: itIsNotA(RegExp)};

const isThrowing: Function = (error: Error): Function =>
  (subject: Function): Is => {
    const label = `is throwing ${error.name}`;
    if (typeof subject !== 'function') {
      return new Is(label, subject, {
        passed: false,
        error: new Error('Exprecting a function'),
      });
    }
    let passed = true;
    try {
      subject();
      passed = false;
    } catch (err) {
      passed = err.name === error.name;
    } finally {
      return new Is(label, subject, {
        passed,
      });
    }
  };

it.is.throwing = isThrowing;

it.is.not.throwing = (error : Error = new Error('')) : Function =>
  (subject: Function): Is => {
    const label = `is not throwing ${error.name}`;
    if (typeof subject !== 'function') {
      return new Is(label, subject, {
        passed: false,
        error: new Error('Exprecting a function'),
      });
    }
    let passed = true;
    try {
      subject();
    } catch (err) {
      passed = err.name !== error.name;
    } finally {
      return new Is(label, subject, {
        passed,
      });
    }
  };

// `describe` returns an emitter that will emit the following events:
// - "describe" (subject: any) this event is triggered to show test has begun
// - "done" (results: Array<Is>)

export function describe(
  subject: any,
  ...describers: Array<Function>
  ): EventEmitter {
  // Separate functions from ocnfigurations
  const functions = describers.filter(
    describer => typeof describer === 'function'
  );
  const options = describers.filter(
    describer => typeof describer === 'object'
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
  const run = (_subject: any): void => {
    // In case there are asynchronous events to wait for, we put a counter here.
    // Like this, when an asynchronous event is done, we know if there are more
    //  to wait for.
    // So this variable below acts like a pseudo generator that will assign
    //  unique keys to each actions.
    type cursor = number;
    let waitForCursor: cursor = 0;
    // This array will contain all the unique ids
    let waitFor: Array<cursor> = [];
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
    functions.forEach(describer => {
      // The result of this particular describer
      // We expect two kind of results here:
      // - a Is (it is a regular describer)
      // - a Listener (we want to describer an emitter's events)
      const result: Is | Listener = describer(_subject);
      // If we have a listner, we need to listen to subject's event
      if (result instanceof Listener) {
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
            // a unique id
            const didNotEmitKey = waitForCursor++;
            // a timer that will succeed if event not emitted
            const shouldNotEmit = setTimeout(() => {
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
                  (checker: Function): void => {
                    const subEmitter: EventEmitter = checker(...messages);
                    // we add unique keys also to our sub emitters
                    const subEmitterKey = waitForCursor++;
                    subEmitter
                      .on('describe', (subSubject: any) => emitter
                        .emit('describe', subSubject)
                      )
                      .on('passed', (subResults: Array<Is>) => emitter
                        .emit('passed', subResults)
                      )
                      .on('failed', (subResults: Array<Is>) => emitter
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

function batch(
  label: string,
  ...describers: Array<Function | Object>
  ): EventEmitter {
  const functions = describers.filter(
    describer => typeof describer === 'function'
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
    functions.forEach(fn => {
      const describer = fn();
      describer
        .on('batch', label => emitter.emit('batch', label))
        .on('describe', (subject, options = []) =>
          emitter.emit('describe', subject, options)
        )
        .on('passed', (results) => emitter.emit('passed', results))
        .on('failed', results => emitter.emit('failed', results))
        .on('done', results => emitter.emit('_done', results))
        .on('done', results => {
          subResults.push(results);
          isDone();
        });
    });
  });
  return emitter;
}

describe.batch = batch;
