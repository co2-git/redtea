// @flow
import {EventEmitter} from 'events';
import type {ASSERTIONS} from '../config/types';

export class Redtea_Emitter {
  label: string;
  that: () => EventEmitter;
  assertions: ASSERTIONS = {};

  constructor(
      label: string,
      that: () => EventEmitter,
      assertions: ASSERTIONS
    ) {
    this.label = label;
    this.that = that;
    this.assertions = assertions;
  }
}

export default function emitter(
    label: string,
    that: () => EventEmitter,
    assertions: ASSERTIONS
  ): Function {
  return (): Redtea_Emitter => new Redtea_Emitter(label, that, assertions);
}
