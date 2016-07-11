import 'babel-polyfill';
import {EventEmitter} from 'events';
import it from './lib/it';
import {Is} from './lib/is';

class Emitter extends EventEmitter {
  subject: any;
  describer: ?Function;
  result: ?Is;

  constructor(subject: any, describer: Function) {
    super();
    this.subject = subject;
    this.describer = describer;
    this._emit('describe', this);
    this.result = describer(subject);
    this._emit(this.result.passed ? 'passed' : 'failed');
    this._emit('done');
  }

  _emit(...messages: Array<any>) {
    process.nextTick(() => this.emit(...messages));
  }
}

function run(subject, describer): Emitter {
  return new Emitter(subject, describer);
}

function *runAll(subject, ...describers) {
  let cursor = 0;
  while (describers[cursor]) {
    yield run(subject, describers[cursor]);
    cursor++;
  }
  return true;
}

function describe(subject, ...describers) {
  const results = [];
  const emitter = new EventEmitter();

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

describe(
  1,
  it.is(1),
  it.is.a.number,
);
