'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

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

  return (0, _2['default'])('redtea', function (it) {

    it('should fulfill', function (ok) {
      return ok();
    });

    it('Nest', [function (it) {

      it('should be true', function (ok) {
        return ok();
      });

      it('should deep nest', [function (it) {

        it('should be cool', function (ok) {
          return ok();
        });
      }]);
    }]);

    it('should reuse', _2['default'].use(function () {
      return reusable(true);
    }));
  });
}

exports['default'] = test;
module.exports = exports['default'];