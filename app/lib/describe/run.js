// @flow
import {EventEmitter} from 'events';
import _ from 'lodash';
import Describe from './is';
import walk from '../walk';
import * as EVENTS from './events';
import type {REPORT} from '../../config/types';

export default function runDescribe(test: Describe, emitter: EventEmitter) {
  emitter.emit(EVENTS.START, test);
  walk({
    ..._.pick(test, ['that', 'assertions']),
    report: (report: REPORT) => {
      emitter.emit(EVENTS.RESULT, test, report);
    }
  });
  emitter.emit(EVENTS.END, test);
}
