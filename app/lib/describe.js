// @flow
class Describe {
  label: string;
  that: any;
  assert: Object;
  constructor(label: string, that: any, assert: Object) {
    this.label = label;
    this.that = that;
    this.assert = assert;
  }
}

export default function describe(
    label: string,
    that: any,
    assert: Object
  ): Function {
  return (): Describe => new Describe(label, that, assert);
}

class Batch {
  label: string;
  tests: Array<any>;
  constructor(label: string, ...tests: Array<any>) {
    this.label = label;
    this.tests = tests;
  }
}

describe.batch = function batch(
    label: string,
    ...tests: Array<Function>
  ): Function {
  return (): Batch => new Batch(label, ...tests);
};
