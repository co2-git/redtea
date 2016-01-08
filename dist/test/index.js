'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function reusable() {
  var foo = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

  return function (it) {
    it('foo should be 1', function () {
      return foo.should.be.exactly(1);
    });
  };
}

function test(props) {
  return (0, _2['default'])('redtea v2.1', function (it) {
    it('synchronous', function () {
      return 1;
    });

    // it('throw', () => { throw new Error('Throw') });

    it('fulfill', function () {
      return new _Promise(function (ok) {
        return ok();
      });
    });

    // it('reject', () => new Promise((ok, ko) => {
    //   ko(new Error('Reject'));
    // }));

    it('time out', function () {
      return new _Promise(function (ok, ko) {
        setTimeout(ok, 1000);
      });
    });

    it('Nest -- closure', function (it) {
      it('should be nested closure', function () {
        return 1;
      });

      it('should nest closure', function (it) {
        it('should be nested closure', function () {
          return 1;
        });
      });
    });

    it('Nest -- array style', [function (it) {
      it('should be nested array style', function () {
        return 1;
      });

      it('should nest', function (it) {
        it('should be nested array style', function () {
          return 1;
        });
      });
    }]);

    it('1', function (it) {
      it('2');

      it('3', function (it) {
        it('4');

        it('5', function (it) {
          it('6');

          it('7', function (it) {
            it('8');
          });
        });

        it('9', function (it) {
          it('10');
        });
      });

      it('reusable', function (it) {
        return reusable()(it);
      });

      it('reusable old synatx', _2['default'].use(function () {
        return reusable();
      }));
    });
  });
}

exports['default'] = test;
module.exports = exports['default'];