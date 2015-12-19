'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libV2 = require('../lib/v2');

var _libV22 = _interopRequireDefault(_libV2);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

function reusable(foo) {
  return function (it) {
    it('should be true value', function (ok) {
      foo.should.be['true']();
      ok();
    });
  };
}

function test() {

  return (0, _libV22['default'])('redtea', function (it) {

    it('1 should be true', function () {
      return true.should.be['true']();
    });

    it('2 should be false', function () {
      return true.should.be['false']();
    });

    it('3 should fulfill', function () {
      return new Promise(function (ok) {
        return ok();
      });
    });

    it('4 should fulfill in 1.5 seconds', function () {
      return new Promise(function (ok, ko) {
        setTimeout(ok, 1500);
      });
    });
  });
}

exports['default'] = test;

test().then(console.log.bind(console, 'ok'), console.log.bind(console, 'ko'));
module.exports = exports['default'];