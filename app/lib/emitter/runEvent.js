// @flow
import {EventEmitter} from 'events';
import Emitter from './is';
import * as EVENTS from './events';
import walk from '../walk';
import type {REPORT, EVENT, ASSERTIONS} from '../../config/types';

export default function runEvent(
    emitter: Emitter,
    watcher: EventEmitter,
    observer: EventEmitter,
    assertion: EVENT,
    event: string,
  ): Promise<boolean|Error> {
  return new Promise((resolve: Function, reject: Function) => {
    try {
      const {wait = 2500, messages: assertMessages} = assertion;
      // Timeout in case event never triggered
      let timeout = setTimeout(() => {
        try {
          observer.emit(EVENTS.RESULT, emitter, {
            type: 'event',
            expected: event,
            that: null,
            valid: false,
            message:
              `event "${event}" never triggered after ${wait} milliseconds`,
          });
          resolve(false);
        } catch (error) {
          resolve(error);
        }
      }, wait);
      // Listen to event
      watcher.on(event, (...eventMessages: any[]) => {
        clearTimeout(timeout);
        observer.emit(EVENTS.START_EVENT, event, ...eventMessages);
        if (Array.isArray(assertMessages)) {
          assertMessages.forEach((message: ASSERTIONS, index: number) => {
            observer.emit(EVENTS.EVENT_MESSAGE, eventMessages[index]);
            walk({
              that: eventMessages[index],
              assertions: message,
              report: (report: REPORT) => {
                observer.emit(EVENTS.RESULT, emitter, report);
              },
            });
          });
        }
        observer.emit(EVENTS.END_EVENT, event, ...eventMessages);
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
}
