// @flow
import {EventEmitter} from 'events';
import Batch from '../batch/is';
import Describe from '../describe/is';
import Emitter from '../emitter/is';
import IsAPromise from '../promise/is';
import runBatch from '../batch/run';
import runDescribe from '../describe/run';
import runEmitter from '../emitter/run';
import runPromise from '../promise/run';

type TYPE =
    Batch
  | Describe
  | Emitter
  | IsAPromise;

async function runAsync(emitter: EventEmitter, ...testers: Function[]) {
  for (const tester of testers) {
    try {
      if (typeof tester !== 'function') {
        throw new Error('Test must be a function');
      }
      const result: TYPE = tester();
      if (result instanceof Batch) {
        await runBatch(result, emitter);
      } else if (result instanceof Describe) {
        await runDescribe(result, emitter);
      } else if (result instanceof Emitter) {
        await runEmitter(result, emitter);
      } else if (result instanceof IsAPromise) {
        await runPromise(result, emitter);
      } else {
        throw new Error(
          'Could not guess type of result ' + result.constructor.name
        );
      }
    } catch (error) {
      console.log(error.stack);
    }
  }
}

export default runAsync;
