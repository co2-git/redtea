// @flow

export default class IsAPromise {
  label: string;
  that: () => Promise<*>;
  assertions: Object;
  constructor(label: string, that: () => Promise<*>, assertions: Object) {
    this.label = label;
    this.that = that;
    this.assertions = assertions;
  }
}
