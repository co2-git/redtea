// @flow
import {EventEmitter} from 'events';
import {Redtea_Describe} from './describe';
import walk from './walk';
import type {
  TEST_RESULT,
} from '../config/types';

export default function runDescribe(test: Redtea_Describe): EventEmitter {
  const emitter = new EventEmitter();
  process.nextTick(() => {
    emitter.emit('start describe', test);
    walk(test.that, test.assert, (report: TEST_RESULT) => {
      emitter.emit('describe result', {test, report});
    });
    emitter.emit('done describe', test);
  });
  return emitter;
}
