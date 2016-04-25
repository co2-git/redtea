// @flow
import {EventEmitter} from 'events';
import sequencer from 'promise-sequencer';
import is from './is';
import type {$is} from './is';

export type $listener = {
  event: string,
  checkers?: Array<Function>,
  not?: boolean,
};

function itIs(value: any): Function {
  return (subject: any): $is => is(subject, value);
}

function itIsNot(value: any): Function {
  return (subject: any): $is => is.not(subject, value);
}

function itIsA(value: any): Function {
  return (subject: any): $is => is.type(subject, value);
}

function itIsNotA(value: any): Function {
  return (subject: any): $is => is.not.type(subject, value);
}

function emits(message: string, ...checkers: Array<Function>): Function {
  return (): $listener => ({
    event: message,
    checkers,
  });
}

function doesNotEmit(event: string): Function {
  return (): $listener => ({
    event,
    not: true,
  });
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

const aa = 'a';

it.is[aa] = itIsA;
it.is.an = itIsA;
it.is.not = itIsNot;
it.is.not[aa] = itIsNotA;
it.is.not.an = itIsNotA;

function handleEmitter(
  emitter: EventEmitter,
  ...listeners: Array<Function>)
  : Promise {
  const handlers = listeners.map((listener: $listener) => listener());
  return new Promise((resolve) => {
    const expectedEvents = listeners
      // .filter(listener => !listener().not)
      .length;
    let receivedEvents = 0;
    const results = [];
    handlers.forEach(listener => {
      const {event, checkers, not} = listener;
      if (not) {
        const timeout = setTimeout(() => {
          receivedEvents++;
          results.push({
            label: `emitter is not emitting "${event}"`,
            passed: true,
            subject: emitter,
            event,
          });
          if (receivedEvents === expectedEvents) {
            resolve({subject: emitter, results});
          }
        }, 2500);
        emitter.once(event, () => {
          clearTimeout(timeout);
          results.push({
            label: `emitter is not emitting "${event}"`,
            passed: false,
            subject: emitter,
            event,
          });
          if (receivedEvents === expectedEvents) {
            resolve({subject: emitter, results});
          }
        });
      } else {
        emitter.once(event, (...messages) => {
          receivedEvents++;
          results.push({
            label: `emitter is emitting "${event}"`,
            passed: true,
            subject: emitter,
            event,
          });
          const eventResults = checkers.map(
            (checker: $is) => checker(...messages)
          );
          results.push(...eventResults);
          if (receivedEvents === expectedEvents) {
            resolve({subject: emitter, results});
          }
        });
      }
    });
  });
}

export function describe(
  subject: any,
  ...describers: Array<Function>
): Promise {
  return new Promise((resolve, reject) => {
    const run = (_subject) => {
      const results = describers.map(describer => describer(_subject));
      resolve({subject, results});
    };
    if (subject instanceof Promise) {
      subject.then(run, run);
    } else if (subject instanceof EventEmitter) {
      handleEmitter(subject, ...describers).then(resolve, reject);
    } else {
      run(subject);
    }
  });
}

function batch(label: string, ...describers: Array<Function>): Promise {
  return new Promise((resolve, reject) => {
    sequencer(describers)
      .then(results => resolve({label, results}))
      .catch(reject);
  });
}

describe.batch = batch;
