// @flow
import {EventEmitter} from 'events';
import runBatch from './runBatch';
import BatchEmitter from './BatchEmitter';
import {Redtea_Batch} from './batch';

async function runRunBatch(emitter: EventEmitter, batch: Redtea_Batch) {
  await new Promise(async (resolve: Function, reject: Function) => {
    try {
      new BatchEmitter(runBatch(batch), emitter);
    } catch (error) {
      reject(error);
    }
  });
}

export default runRunBatch;
