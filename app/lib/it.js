import {EventEmitter} from 'events';
import is, {Is} from './is';
import Listener from './listener';

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

const it = {
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

const defaultError = new Error('Default redtea error placeholder');

const isThrowing: Function = (error: Error = defaultError): Function =>
  (subject: Function): Is => {
    const label = `is throwing ${error.name}`;
    if (typeof subject !== 'function') {
      return new Is(label, subject, {
        passed: false,
        error: new Error('Expecting a function'),
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

it.is.not.throwing = (error : Error = defaultError) : Function =>
  (subject: Function): Is => {
    const label = `is not throwing ${error.name}`;
    if (typeof subject !== 'function') {
      return new Is(label, subject, {
        passed: false,
        error: new Error('Expecting a function'),
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

export default it;
