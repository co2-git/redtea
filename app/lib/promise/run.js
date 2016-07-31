// @flow
import {EventEmitter} from 'events';
import IsAPromise from './is';
import walk from '../walk';
import * as EVENTS from './events';
import type {REPORT} from '../../config/types';

export default function runPromise(promise: IsAPromise, emitter: EventEmitter) {
  try {
    const promised = promise.that();
    emitter.emit(EVENTS.START, {
      ...promise,
      that: promised,
    });
    promised
      .then((result: any) => {
        walk(result, promise.assertions, (report: REPORT) => {
          emitter.emit(EVENTS.RESULT, {test: promise, report});
        });
      })
      .catch((error: Error) => {
        walk(error, promise.assertions, (report: REPORT) => {
          emitter.emit(EVENTS.RESULT, {test: promise, report});
        });
      });
    emitter.emit(EVENTS.END, promise);
  } catch (error) {
    emitter.emit(EVENTS.ERROR, error);
  }
}