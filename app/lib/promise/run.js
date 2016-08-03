// @flow
import {EventEmitter} from 'events';
import IsAPromise from './is';
import walk from '../walk';
import * as EVENTS from './events';
import type {REPORT} from '../../config/types';

export default function runPromise(
    promise: IsAPromise,
    emitter: EventEmitter
  ): Promise<*> {
  return new Promise((resolve: Function) => {
    try {
      const promised = promise.that();
      emitter.emit(EVENTS.START, {
        ...promise,
        that: promised,
      });
      const wait = promise.assertions.wait || 2500;
      let timer = setTimeout(() => {
        emitter.emit(EVENTS.ERROR, promise, new Error('Promise timed out'));
        emitter.emit(EVENTS.END, promise);
        resolve();
      }, wait);
      promised
        .then((result: any) => {
          clearTimeout(timer);
          emitter.emit(EVENTS.PROMISE, promise, result);
          walk({
            that: result,
            assertions: promise.assertions,
            report: (report: REPORT) => {
              emitter.emit(EVENTS.RESULT, promise, report);
            }
          });
          emitter.emit(EVENTS.END, promise);
          resolve();
        })
        .catch((error: Error) => {
          clearTimeout(timer);
          emitter.emit(EVENTS.PROMISE, promise, error);
          walk({
            that: error,
            assertions: promise.assertions,
            report: (report: REPORT) => {
              emitter.emit(EVENTS.RESULT, promise, report);
            },
          });
          emitter.emit(EVENTS.END, promise);
          resolve();
        });
    } catch (error) {
      emitter.emit(EVENTS.ERROR, promise, error);
      emitter.emit(EVENTS.END, promise);
      resolve();
    }
  });
}
