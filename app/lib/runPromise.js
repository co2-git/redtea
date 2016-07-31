// @flow
import {EventEmitter} from 'events';
import {Redtea_Promise} from './promise';
import walk from './walk';
import type {
  TEST_RESULT,
} from '../config/types';

export default function runPromise(test: Redtea_Promise): EventEmitter {
  const emitter = new EventEmitter();
  process.nextTick(() => {
    try {
      const promise = test.that();
      emitter.emit('start', {
        ...test,
        that: promise,
      });
      promise
        .then((result: any) => {
          walk(result, test.assertions, (report: TEST_RESULT) => {
            emitter.emit('result', {test, report});
          });
        })
        .catch((error: Error) => {
          walk(error, test.assertions, (report: TEST_RESULT) => {
            emitter.emit('result', {test, report});
          });
        });
      emitter.emit('done', test);
    } catch (error) {
      emitter.emit('error', error);
    }
  });
  return emitter;
}
