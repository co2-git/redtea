// @flow
import {EventEmitter} from 'events';
import runAsync from './runAsync';
import * as EVENTS from './events';

export default function run(...testers: Function[]): EventEmitter {
  const emitter = new EventEmitter();
  process.nextTick(async () => {
    try {
      emitter.emit(EVENTS.START);
      await runAsync(emitter, ...testers);
      emitter.emit(EVENTS.END);
    } catch (error) {
      console.log(error.stack);
      emitter.emit(EVENTS.ERROR, error);
    }
  });
  return emitter;
}
