import 'babel-polyfill';
import {EventEmitter} from 'events';
import it from './lib/it';

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

function describe(subject, ...describers) {
  const emitter = new EventEmitter();

  function emit(...messages) {
    process.nextTick(() => emitter.emit(...messages));
  }

  function run(_subject) {
    const results = [];

    for (const result of runAll(_subject, ...describers)) {
      results.push(result);
      if (result.passed) {
        emit('passed', _subject, result);
      } else {
        emit('failed', _subject, result);
      }
    }
  }

  emit('describe', subject);

  if (subject instanceof Promise) {
    subject.then(run, run);
  } else {
    run(subject);
  }

  return emitter;
}

function wrap(fn) {
  fn()
    .on('error', error => console.log(error.stack))
    .on('describe', (subject) => console.log('describe', subject))
    .on('passed', (subject, result) => console.log('passed', result))
    .on('failed', (subject, result) => console.log('failed', result));
}

function throwError() {
  throw new Error('OOO');
}

wrap(() => describe(throwError, it.is.not.throwing()));
