// @flow
import {EventEmitter} from 'events';
import Emitter from './is';
import * as EVENTS from './events';
import runEvent from './runEvent';
import runNonEvent from './runNonEvent';

export default function runEmitter(
    emitter: Emitter,
    observer: EventEmitter
  ): Promise<void> {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      // Disclose emitter from function
      const watcher: EventEmitter = emitter.that();
      // Exit if disclosed return is not an emitter
      if (!(watcher instanceof EventEmitter)) {
        throw new Error('Can not watch events from a non-emitter');
      }
      // Tell observer we began testing emitter
      observer.emit(EVENTS.START, {
        ...emitter,
        that: watcher,
      });
      // Internal counters
      const {emits, emitsNot} = emitter.assertions;
      // Walk each event
      const promises = [];
      if (emits) {
        // Events to watch
        promises.push(
          Promise.all(
            Object.keys(emits)
              .map((event: string): Promise<boolean|Error> => runEvent(
                emitter,
                watcher,
                observer,
                emits[event],
                event,
              ))
          )
        );
      }
      // Events that are not supposed to trigger
      if (emitsNot) {
        promises.push(
          Promise.all(
            Object.keys(emitsNot)
              .map((event: string): Promise<boolean|Error> => runNonEvent(
                emitter,
                watcher,
                observer,
                event,
                emitsNot[event],
              ))
          )
        );
      }
      await Promise.all(promises);
      // Return results
      observer.emit(EVENTS.END, emitter);
      resolve();
    } catch (error) {
      observer.emit(EVENTS.ERROR, emitter, error);
      reject(error);
    }
  });
}
