// @flow
import {EventEmitter} from 'events';
import runDescribe from './runDescribe';
import DescribeEmitter from './DescribeEmitter';
import {Redtea_Describe} from './describe';

async function runRunDescribe(
    emitter: EventEmitter,
    describer: Redtea_Describe
  ) {
  await new Promise(async (resolve: Function, reject: Function) => {
    try {
      new DescribeEmitter(runDescribe(describer), emitter);
    } catch (error) {
      reject(error);
    }
  });
}

export default runRunDescribe;
