// @flow
import {EventEmitter} from 'events';
import Describe from './is';
import walk from '../walk';
import * as EVENTS from './events';
import type {
  TEST_RESULT,
} from '../../config/types';

export default function runDescribe(test: Describe, emitter: EventEmitter) {
  emitter.emit(EVENTS.START, test);
  walk(test.that, test.assertions, (report: TEST_RESULT) => {
    emitter.emit(EVENTS.RESULT, {test, report});
  });
  emitter.emit(EVENTS.END, test);
}
