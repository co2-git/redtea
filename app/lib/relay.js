// @flow
import {EventEmitter} from 'events';

export default function relay(
    emitter: EventEmitter,
    listener: EventEmitter,
    fn: ?Function,
  ) {
  [
    'start',
    'error',
    'new test',
    'test done',
    'new batch',
    'batch done',
    'result',
    'new event',
    'event message',
    'event done',
    'done',
  ]
  .forEach((event: string) => {
    emitter.on(event, listener.emit.bind(listener, event));
  });
  if (typeof fn === 'function') {
    fn(emitter);
  }
}
