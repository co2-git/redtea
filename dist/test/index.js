'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

function test() {
  return (0, _2['default'])('New format', function (it) {
    it('should be cool', function (ok) {
      return ok();
    });
    it.describe('should be nested', function (it) {
      it('should be supa cool', function (ok) {
        return ok();
      });
    });
  });
}

exports['default'] = test;
module.exports = exports['default'];