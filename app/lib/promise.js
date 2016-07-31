// @flow
import type {ASSERTIONS} from '../config/types';

export class Redtea_Promise {
  label: string;
  that: () => Promise<*>;
  assertions: ASSERTIONS = {};
  constructor(
      label: string,
      that: () => Promise<*>,
      assertions: ASSERTIONS
    ) {
    this.label = label;
    this.that = that;
    this.assertions = assertions;
  }
}

export default function promise(
    label: string,
    that: () => Promise<*>,
    assertions: ASSERTIONS
  ): Function {
  return (): Redtea_Promise => new Redtea_Promise(label, that, assertions);
}
