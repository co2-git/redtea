// @flow
import type {ASSERTIONS} from '../config/types';

class _Promise {
  label: string;
  promise: Promise<*> | () => Promise<*>;
  assertions: ASSERTIONS = {};
  constructor(
      label: string,
      _promise: Promise<*> | () => Promise<*>,
      assertions: ASSERTIONS
    ) {
    this.label = label;
    this.promise = _promise;
    this.assertions = assertions;
  }
}

export default function promise(
    label: string,
    _promise: Promise<*> | () => Promise<*>,
    assertions: ASSERTIONS
  ): Function {
  return (): _Promise => new _Promise(label, _promise, assertions);
}
