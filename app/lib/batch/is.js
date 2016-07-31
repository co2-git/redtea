// @flow
import Describe from '../describe/is';

export default class Batch {
  label: string;
  tests: Array<Describe|Batch>;
  constructor(label: string, ...tests: Array<Describe|Batch>) {
    this.label = label;
    this.tests = tests;
  }
}
