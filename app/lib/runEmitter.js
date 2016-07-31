// @flow
import {EventEmitter} from 'events';
import type {Redtea_Emitter} from './emitter';
import walk from './walk';
import type {
  REPORT,
} from '../config/types';

export default function runEmitter(test: Redtea_Emitter): EventEmitter {
  const emitter = new EventEmitter();
  process.nextTick(() => {
    try {
      const watcher = test.that();
      emitter.emit('start', {
        ...test,
        that: watcher,
      });
      if (test.assertions.emits) {
        const expectedNumberOfEvents: number =
          Object.keys(test.assertions.emits).length;
        const eventsTriggered: string[] = [];
        const eventsNotTriggered: string[] = [];
        const done: Function = () => {
          if (
            (eventsTriggered.length + eventsNotTriggered.length)
              === expectedNumberOfEvents
          ) {
            emitter.emit('done', test);
          }
        };
        for (const event in test.assertions.emits) {
          const wait = ('wait' in test.assertions.emits[event])
            ? test.assertions.emits[event].wait : 2500;
          let timeout = setTimeout(() => {
            emitter.emit('result', {test, report: {
              type: 'event',
              expected: event,
              that: null,
              valid: false,
              message:
                `event "${event}" never triggered after ${wait} milliseconds`,
            }});
            eventsNotTriggered.push(event);
            done();
          }, wait);
          watcher.on(event, (...messages: any[]) => {
            clearTimeout(timeout);
            emitter.emit('event ok', event, ...messages);
            if (Array.isArray(test.assertions.emits[event].messages)) {
              test.assertions.emits[event].messages
                .forEach((message: any, index: number) => {
                  emitter.emit('event message', messages[index]);
                  walk(messages[index], message, (report: REPORT) => {
                    emitter.emit('result', {test, report});
                  });
                });
            } else {
              // emitter.emit('event message', messages);
              messages.forEach((message: any, index: number) => {
                walk(
                  message,
                  test.assertions.emits[event].messages,
                  (report: REPORT) => {
                    emitter.emit('result', {test, report});
                  });
              });
            }
            emitter.emit('event done', event, ...messages);
            eventsTriggered.push(event);
            done();
          });
        }
      }
    } catch (error) {
      emitter.emit('error', error);
    }
  });
  return emitter;
}
