// @flow
import {EventEmitter} from 'events';
import sequencer from 'promise-sequencer';
import is from './is';

function itIs(value: any): Function {
  return (subject: any): void => {
    is(subject, value);
  };
}

function itIsA(value: any): Function {
  return (subject: any): void => {
    is.type(subject, value);
  };
}

function emits(message: string, ...checkers: Array<Function>): Function {
  return (): Object => ({
    event: message,
    checkers,
  });
}

export const it = {
  is: itIs,
  emits,
  does: {
    not: {
      emit: (event: string): Function => () => ({
        event,
        checkers: [
          new Promise((resolve, reject) => reject(
            new Error('Emitter was not supposed to emit ' + event))
          )
        ],
        not: true,
      }),
    }
  },
};

const aa = 'a';

it.is[aa] = itIsA;
it.is.an = itIsA;

export function describe(
  subject: any,
  ...describers: Array<Function>
): Promise {
  return new Promise((resolve, reject) => {
    const run = (_subject) => {
      describers.forEach(describer => {
        try {
          describer(_subject);
        } catch (error) {
          reject(error);
        }
      });
      resolve();
    };
    if (subject instanceof Promise) {
      subject.then(run, run);
    } else if (subject instanceof EventEmitter) {
      let emitted = 0;
      const triggers = describers.map(describer => describer());
      const listeners = triggers.filter(trigger => !trigger.not).length;
      triggers.forEach(trigger => subject.on(trigger.event, (...messages) => {
        if (!trigger.not) {
          emitted++;
        }
        sequencer(trigger.checkers.map(checker => () => checker(...messages)))
          .then(() => {
            if (emitted === listeners) {
              resolve();
            }
          })
          .catch(reject);
      }));
    } else {
      run(subject);
    }
  });
}

// describe(1, it.is(1), it.is.a(Number))
//   .then(results => console.log({results}))
//   .catch(error => console.log({error}));
//
// describe(new Promise((resolve) => resolve(22)), it.is.a(Number))
//   .then(results => console.log({results}))
//   .catch(error => console.log({error}));
//
// describe(new Promise((resolve, reject) => reject(new Error('!'))), it.is.an(Error))
//   .then(results => console.log({results}))
//   .catch(error => console.log({error}));

const emitter = new EventEmitter();

setTimeout(() => emitter
  .emit('hello')
, 1000);

setTimeout(() => emitter
  .emit('foo', 1)
, 2000);

describe(emitter,
    it.emits('hello'),
    it.emits('foo',
      (num) => describe(num, it.is.a(Number))
    ),
    it.does.not.emit('error')
  )
  .then(results => console.log({results}))
  .catch(error => console.log({error}));

// describe.batch = (label, ...describers) => {
//   return new Promise((resolve, reject) => {
//     sequencer(describers)
//       .then(resolve)
//       .catch(reject);
//   });
// };
//
// describe
//   .batch('hello',
//     () => describe(1, it.is(1))
//   )
//   .then(() => console.log('OK'))
//   .catch(error => console.log(error.stack));
