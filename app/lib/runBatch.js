// @flow
import {EventEmitter} from 'events';
import run from './run';
import {Redtea_Batch} from './batch';
import BatchEmitter from './BatchEmitter';

export default function run_batch(batch: Redtea_Batch): EventEmitter {
  const emitter = new EventEmitter();
  new BatchEmitter(run(...batch.tests), emitter);
  process.nextTick(emitter.emit.bind(emitter, 'start batch', batch));
  return emitter;
}
