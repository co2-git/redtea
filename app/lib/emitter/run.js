// @flow
import {EventEmitter} from 'events';
import Emitter from './is';
import * as EVENTS from './events';
import walk from '../walk';
import type {REPORT} from '../../config/types';

export default function runEmitter(
    emitter: Emitter,
    observer: EventEmitter
  ): Promise<void> {
  return new Promise((resolve: Function) => {
    try {
      const watcher = emitter.that();
      observer.emit(EVENTS.START, {
        ...emitter,
        that: watcher,
      });
      if (emitter.assertions.emits) {
        const expectedNumberOfEvents: number =
          Object.keys(emitter.assertions.emits).length;
        const eventsTriggered: string[] = [];
        const eventsNotTriggered: string[] = [];
        const done: Function = () => {
          if (
            (eventsTriggered.length + eventsNotTriggered.length)
              === expectedNumberOfEvents
          ) {
            observer.emit(EVENTS.END, emitter);
            resolve();
          }
        };
        for (const event in emitter.assertions.emits) {
          const wait = ('wait' in emitter.assertions.emits[event])
            ? emitter.assertions.emits[event].wait : 2500;
          let timeout = setTimeout(() => {
            observer.emit(EVENTS.RESULT, {test: emitter, report: {
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
            observer.emit(EVENTS.START_EVENT, event, ...messages);
            if (Array.isArray(emitter.assertions.emits[event].messages)) {
              emitter.assertions.emits[event].messages
                .forEach((message: any, index: number) => {
                  observer.emit(EVENTS.EVENT_MESSAGE, messages[index]);
                  walk(messages[index], message, (report: REPORT) => {
                    observer.emit(EVENTS.RESULT, {test: emitter, report});
                  });
                });
            } else {
              messages.forEach((message: any) => {
                observer.emit(EVENTS.EVENT_MESSAGE, message);
                walk(
                  message,
                  emitter.assertions.emits[event].messages,
                  (report: REPORT) => {
                    observer.emit(EVENTS.RESULT, {test: emitter, report});
                  });
              });
            }
            observer.emit(EVENTS.END_EVENT, event, ...messages);
            eventsTriggered.push(event);
            done();
          });
        }
      }
    } catch (error) {
      console.log(error);
      observer.emit(EVENTS.ERROR, emitter, error);
    }
  });
}
