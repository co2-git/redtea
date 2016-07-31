'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = isReport;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isReport(report, checker) {
  console.log('Is a report', report);

  var types = ['value'];

  (0, _assert2.default)((typeof report === 'undefined' ? 'undefined' : (0, _typeof3.default)(report)) === 'object');
  (0, _assert2.default)(_lodash2.default.includes(types, report.type));
  (0, _assert2.default)('expected' in report);
  (0, _assert2.default)('that' in report);

  if (checker.type) {
    (0, _assert2.default)(report.type === checker.type);
  }
  if (checker.expected) {
    (0, _assert2.default)(_lodash2.default.isEqual(report.expected, checker.expected));
  }
  if (checker.that) {
    (0, _assert2.default)(_lodash2.default.isEqual(report.that, checker.that));
  }
  if (checker.valid) {
    (0, _assert2.default)(report.valid === checker.valid);
  }
}