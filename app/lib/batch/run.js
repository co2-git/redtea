// @flow
import {EventEmitter} from 'events';
import Batch from './is';
import * as EVENTS from './events';
import runAsync from '../all/runAsync';

async function runBatch(batch: Batch, emitter: EventEmitter) {
  try {
    emitter.emit(EVENTS.START, batch);
    await runAsync(emitter, ...batch.tests);
    emitter.emit(EVENTS.END, batch);
  } catch (error) {
    emitter.emit(EVENTS.ERROR, batch, error);
  }
}

export default runBatch;
