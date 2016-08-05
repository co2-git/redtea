// @flow
import {EventEmitter} from 'events';
import Emitter from './is';
import * as EVENTS from './events';

export default function runEvent(
    emitter: Emitter,
    watcher: EventEmitter,
    observer: EventEmitter,
    event: string,
    wait: number,
  ): Promise<boolean|Error> {
  return new Promise((resolve: Function, reject: Function) => {
    try {
      // Timeout in case event never triggered
      let timeout = setTimeout(() => {
        try {
          observer.emit(EVENTS.RESULT, emitter, {
            type: 'event',
            expected: event,
            that: null,
            valid: true,
            message:
              `event "${event}" should not trigger after ${wait} milliseconds`,
          });
          resolve(true);
        } catch (error) {
          resolve(error);
        }
      }, wait);
      // Listen to event
      watcher.on(event, () => {
        clearTimeout(timeout);
        observer.emit(EVENTS.RESULT, emitter, {
          type: 'event',
          expected: event,
          that: null,
          valid: false,
          message:
            `event "${event}" should not trigger after ${wait} milliseconds`,
        });
        resolve(false);
      });
    } catch (error) {
      reject(error);
    }
  });
}
