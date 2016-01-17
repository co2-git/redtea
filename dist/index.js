'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libIt = require('./lib/it');

var _libIt2 = _interopRequireDefault(_libIt);

function describe(label, story) {
  var test = new _libIt2['default'](label, story);
  var promise = test.run();
  promise.live = test;
  return promise;
}

describe.use = function (fn) {
  return function (it) {
    return fn()(it);
  };
};

describe.pause = function (ms) {
  return function (it) {
    return it('should pause', function () {
      return new Promise(function (ok) {
        return setTimeout(ok, ms);
      });
    });
  };
};

exports['default'] = describe;
module.exports = exports['default'];