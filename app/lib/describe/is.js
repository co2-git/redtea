// @flow

export default class Describe {
  label: string;
  that: any;
  assertions: Object;
  constructor(label: string, that: any, assertions: Object) {
    this.label = label;
    this.that = that;
    this.assertions = assertions;
  }
}
