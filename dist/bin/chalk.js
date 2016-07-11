'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chalk;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pad(character, times) {
  return _lodash2.default.range(times).map(function () {
    return character;
  }).join('');
}

function chalk(message) {
  var type = arguments.length <= 1 || arguments[1] === undefined ? 'success' : arguments[1];

  var width = 52;
  var color = type === 'success' ? 'bgGreen' : 'bgRed';
  var margin = width - message.length;
  console.log('  ', _colors2.default[color](pad(' ', width)));
  console.log('  ', _colors2.default[color](pad(' ', margin / 2 - 1), message, pad(' ', margin / 2 - 1)));
  console.log('  ', _colors2.default[color](pad(' ', width)));
}