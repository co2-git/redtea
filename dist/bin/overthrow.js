'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = overthrow;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function overthrow(error) {
  console.log(_colors2.default.yellow(error.stack));
  process.exit(8);
}