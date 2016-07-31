// @flow
import {EventEmitter} from 'events';

export default class Emitter {
  label: string;
  that: () => EventEmitter;
  assertions: Object;
  constructor(label: string, that: () => EventEmitter, assertions: Object) {
    this.label = label;
    this.that = that;
    this.assertions = assertions;
  }
}
