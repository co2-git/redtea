'use strict';

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _walk = require('../../lib/walk');

var _walk2 = _interopRequireDefault(_walk);

var _report = require('../is/report');

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _run2.default)('walk()', [{
  label: 'walk is a function',
  assert: typeof _walk2.default === 'function'
}, {
  label: 'walk echoes a report',
  assert: function assert() {
    (0, _walk2.default)(null, { value: null }, function (report) {
      (0, _report2.default)(report, {
        type: 'value',
        expected: null,
        that: null,
        valid: true
      });
    });
    return true;
  }
}, {
  label: 'walk echoes a report for fail',
  assert: function assert() {
    (0, _walk2.default)(null, { value: 1 }, function (report) {
      (0, _report2.default)(report, {
        type: 'value',
        expected: 1,
        that: null,
        valid: false
      });
    });
    return true;
  }
}, {
  label: 'walk echoes a report for not',
  assert: function assert() {
    (0, _walk2.default)(null, { not: { value: 1 } }, function (report) {
      (0, _report2.default)(report, {
        type: 'value',
        expected: { not: 1 },
        that: null,
        valid: true
      });
    });
    return true;
  }
}]);