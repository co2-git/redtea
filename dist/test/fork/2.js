'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ = require('../..');

var _2 = _interopRequireDefault(_);

function b(props) {
  return (0, _2['default'])('B', function (it) {
    it('ko', function () {
      throw new Error('ko');
    });
  });
}

exports['default'] = b;
module.exports = exports['default'];