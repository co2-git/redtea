// @flow
import {EventEmitter} from 'events';
import sequencer from 'promise-sequencer';
import is from './is';

function itIs(value: any): Function {
  return (subject: any): Object => is(subject, value);
}

function itIsNot(value: any): Function {
  return (subject: any): Object => is.not(subject, value);
}

function itIsA(value: any): Function {
  return (subject: any): Object => is.type(subject, value);
}

function itIsNotA(value: any): Function {
  return (subject: any): Object => is.not.type(subject, value);
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
it.is.not = itIsNot;
it.is.not[aa] = itIsNotA;
it.is.not.an = itIsNotA;

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
      let emitted = 0;
      const triggers = describers.map(describer => describer());
      const listeners = triggers.filter(trigger => !trigger.not).length;
      const events = [];
      triggers.forEach(trigger => subject.on(trigger.event, (...messages) => {
        if (!trigger.not) {
          emitted++;
          sequencer(trigger.checkers.map(checker => () => checker(...messages)))
            .then(results => {
              events.push({subject, event: trigger.event, results});
              if (emitted === listeners) {
                if (listeners !== triggers.length) {
                  const notTriggered = triggers
                    .filter(trigger => trigger.not)
                    .map(trigger => ({subject, event: trigger.event, results: [{
                      label: 'does not emit',
                    }]}));
                  events.push(...notTriggered);
                }
                resolve(events);
              }
            })
            .catch(reject);
        } else {
          reject(new Error('Unexpected event ' + trigger.event));
        }
      }));
    } else {
      run(subject);
    }
  });
}

// describe(1, it.is(1), it.is.a(Number))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));

// describe(new Promise((resolve) => resolve(22)), it.is.a(Number))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));
//
// describe(new Promise((resolve, reject) => reject(new Error('!'))), it.is.an(Error))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));

// const emitter = new EventEmitter();
//
// setTimeout(() => emitter
//   .emit('hello')
// , 1000);
//
// setTimeout(() => emitter
//   .emit('foo', 1)
// , 2000);

// describe(emitter,
//     it.emits('hello'),
//     it.emits('foo',
//       (num) => describe(num, it.is.a(Number))
//     ),
//     it.does.not.emit('error')
//   )
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));

// describe(emitter, it.does.not.emit('foo'))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));;

function batch(label: string, ...describers: Array<Function>): Promise {
  return new Promise((resolve, reject) => {
    sequencer(describers)
      .then(results => resolve({label, results}))
      .catch(reject);
  });
}

describe.batch = batch;

// describe
//   .batch('hello',
//     () => describe(1, it.is(1), it.is.a(Number)),
//     () => describe.batch('foo',
//       () => describe(1, it.is(1), it.is.a(Number)),
//     )
//   )
//   .then((results) => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log(error.stack));
