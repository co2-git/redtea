// @flow
import {EventEmitter} from 'events';
import runPromise from './runPromise';
import relay from './relay';
import {Redtea_Promise} from './promise';

async function runRunPromise(
    emitter: EventEmitter,
    promise: Redtea_Promise
  ) {
  await new Promise(async (resolve: Function, reject: Function) => {
    try {
      relay(runPromise(promise), emitter, {
        start: 'new test',
        done: 'test done',
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default runRunPromise;
