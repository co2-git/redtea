// @flow
import {EventEmitter} from 'events';
import runEmitter from './runEmitter';
import relay from './relay';
import {Redtea_Emitter} from './emitter';

async function runRunEmitter(
    emitter: EventEmitter,
    thatEmitter: Redtea_Emitter
  ) {
  await new Promise(async (resolve: Function, reject: Function) => {
    try {
      relay(runEmitter(thatEmitter), emitter, {
        start: 'new test',
        done: 'test done',
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default runRunEmitter;
