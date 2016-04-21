'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _it = require('./lib/it');

var _it2 = _interopRequireDefault(_it);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function describe(label, story) {
  var test = new _it2.default(label, story);
  var promise = test.run();
  promise.live = test;
  return promise;
} //  weak

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

exports.default = describe;