// @flow

import assert from 'assert';
import _ from 'lodash';
import type {REPORT_CHECKER} from '../../config/types';

export default function isReport(
  report: any,
  checker: REPORT_CHECKER
) {
  console.log('Is a report', report);

  const types = ['value'];

  assert(typeof report === 'object');
  assert(_.includes(types, report.type));
  assert(('expected' in report));
  assert(('that' in report));

  if (checker.type) {
    assert(report.type === checker.type);
  }
  if (checker.expected) {
    assert(_.isEqual(report.expected, checker.expected));
  }
  if (checker.that) {
    assert(_.isEqual(report.that, checker.that));
  }
  if (checker.valid) {
    assert(report.valid === checker.valid);
  }
}
