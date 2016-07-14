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
