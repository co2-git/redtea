// @flow
import {EventEmitter} from 'events';

export default class DescribeEmitter extends EventEmitter {
  static events: string[] = [
    'error',
    'start describe',
    'done describe',
    'describe result',
  ];
  constructor(reporter: EventEmitter, watcher: EventEmitter) {
    super();
    DescribeEmitter.events.forEach((event: string) => {
      reporter.on(event, watcher.emit.bind(watcher, event));
    });
  }
}
