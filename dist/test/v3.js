'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libV3 = require('../lib/v3');

var _libV32 = _interopRequireDefault(_libV3);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

// function reusable (foo) {
//   return it => {
//     it('should be true value', ok => {
//       foo.should.be.true();
//       ok();
//     });
//   };
// }
//
// function test () {
//
//   return describe ( 'redtea v3' , it => {
//
//     it('1 should be true', () => true.should.be.true());
//
//     it('2 should be false', () => true.should.be.false());
//
//     it('3 should fulfill', () => new Promise(ok => ok()));
//
//     it('4 should fulfill in 1.5 seconds', () => new Promise((ok, ko) => {
//       setTimeout(ok, 1500);
//     }));
//
//
//   } );
// }
//
// export default test;
//
// test().then(console.log.bind(console, 'ok'), console.log.bind(console, 'ko'));

(0, _libV32['default'])('redtea v3', function (it) {

  it('redtea v3 it oneliner', function () {
    return true.should.be['true']();
  });

  it('redtea v3 it oneliner with error', function () {
    return false.should.be['true']();
  });

  it('should fulfill', function () {
    return new Promise(function (ok) {
      return ok();
    });
  });

  it('should fulfill in 1 second', function () {
    return new Promise(function (ok) {
      return setTimeout(ok, 1000);
    });
  });

  it('should nest', function (it) {

    it('redtea v3 it oneliner', function () {
      return true.should.be['true']();
    });

    it('redtea v3 it oneliner with error', function () {
      return false.should.be['true']();
    });

    it('should fulfill', function () {
      return new Promise(function (ok) {
        return ok();
      });
    });

    it('should fulfill in 1 second', function () {
      return new Promise(function (ok) {
        return setTimeout(ok, 1000);
      });
    });
  });
}).then(function (props) {
  console.log({ 'redtea v3': props });
}, function (error) {
  return console.log(error);
});

setTimeout(function () {});