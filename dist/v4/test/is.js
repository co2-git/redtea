'use strict';

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

require('should');

var _is = require('../lib/is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(label, story) {
  try {
    story();
    console.log(_safe2.default.green('  √ ' + label));
  } catch (error) {
    console.log(_safe2.default.red('  × ' + label));
    console.log(_safe2.default.yellow(error.stack));
  }
}

console.log(_safe2.default.bold.underline.italic('is'));

test('null is null', function () {
  return (0, _is2.default)(null, null);
});