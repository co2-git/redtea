import 'babel-polyfill';
import 'colors';
import {EventEmitter} from 'events';
import it from './lib/it';
import {Is} from './lib/is';
import Listener from './lib/Listener';

function *runAll(subject, ...describers) {
  let cursor = 0;
  while (describers[cursor]) {
    yield runOne(subject, describers[cursor]);
    cursor++;
  }
  return true;
}

function runOne(subject, describer) {
  return describer(subject);
}

function emit(emitter, ...messages) {
  process.nextTick(() => emitter.emit(...messages));
}

function run(emitter, subject, ...describers) {
  const results = [];

  for (const result of runAll(subject, ...describers)) {
    results.push(result);
    if (result.passed) {
      emit(emitter, 'passed', subject, result);
    } else {
      emit(emitter, 'failed', subject, result);
    }
  }

  emit(emitter, 'done');
}

function describe(subject, ...describers) {
  const emitter = new EventEmitter();

  emit(emitter, 'describe', subject);

  if (subject instanceof Promise) {
    subject
      .then(resolved => run(emitter, resolved, ...describers))
      .catch(rejected => run(emitter, rejected, ...describers));
  } else if (subject instanceof EventEmitter) {
    describe.emitter(emitter, subject, ...describers);
  } else {
    run(emitter, subject, ...describers);
  }

  return emitter;
}

describe.emitter = (emitter, subject, ...describers) => {
  const functions = describers.filter(
    describer => typeof describer === 'function'
  );
  const options = describers.filter(
    describer => typeof describer === 'object'
  );
  const listeners = functions.map(describer => describer(subject));
  const timers = [];
  const _listeners = [];
  listeners.forEach((listener, index) => {
    if (listener instanceof Listener) {
      const listenerOptions = listener.checkers.map(
        checker => typeof checker === 'object'
      );
      _listeners[index] = () => {
        clearTimeout(timers[index]);
        if (!listener.checkers.length) {
          emitter.emit('passed', subject, new Is(
            `it is emitting "${listener.event}"`,
            subject,
            {
              passed: true,
              event: listener.event
            }
          ));
        }
      };
      timers[index] = setTimeout(() => {
        emitter.emit('failed', subject, new Is(
          `it is emitting "${listener.event}"`,
          subject,
          {
            passed: false,
            event: listener.event
          }
        ));
        subject.removeListener(listener.event, _listeners[index]);
      }, listenerOptions.wait || 2500);
      subject.once(listener.event, _listeners[index]);
    } else {
      if (listener.passed) {
        emit(emitter, 'passed', listener);
      }
    }
  });
};

function sequence(emitter, ...functions) {
  let cursor = 0;

  function next() {
    cursor++;
    runner.next();
  }

  function runOneDescriber() {
    functions[cursor]()
      .on('error', error => {
        console.log(error.stack.red);
        next();
      })
      .on('describe', emitter.emit.bind(emitter, 'describe'))
      .on('passed', emitter.emit.bind(emitter, 'passed'))
      .on('failed', emitter.emit.bind(emitter, 'failed'))
      .on('done', () => {
        console.log('done'.bgGreen);
        console.log();
        console.log();
        next();
      });
  }

  function *runAllDescribers() {
    while (functions[cursor]) {
      try {
        yield runOneDescriber(cursor);
      } catch (ex) {
        yield new Is(
          'Caught error',
          ex,
          {
            passed: false,
            error: ex
          }
        );
      }
    }
  }

  const runner = runAllDescribers();
  runner.next();
}

function batch(label, ...describers) {
  const emitter = new EventEmitter();

  console.log(label.bold.underline);

  sequence(emitter, ...describers);

  return emitter;
}

function throwError() {
  throw new Error('OOO');
}

const emitter = new EventEmitter();

setTimeout(() => emitter.emit('foo'), 2000);

// sequence(
//   () => describe(1, it.is(1)),
//   () => describe(new Promise((resolve) => resolve(22)), it.is.a.number),
//   () => describe('foo', it.is.a.number),
//   () => describe(throwError, it.is.throwing()),
//   () => describe(emitter, it.is.an.emitter),
// );

batch('Test',
  () => describe(1, it.is(1)),
  () => describe(new Promise((resolve) => resolve(22)), it.is.a.number),
  () => describe('foo', it.is.a.number),
  () => describe(throwError, it.is.throwing()),
  () => describe(emitter, it.is.an.emitter),
)
  .on('describe', subject => console.log(subject))
  .on('passed', (subject, result) => console.log('passed'.green, result))
  .on('failed', (subject, result) => console.log('failed'.yellow, result));
