// @flow
class Batch {
  label: string;
  tests: Array<any>;
  constructor(label: string, ...tests: Array<any>) {
    this.label = label;
    this.tests = tests;
  }
}

export default function batch(
    label: string,
    ...tests: Array<Function>
  ): Function {
  return (): Batch => new Batch(label, ...tests);
}
