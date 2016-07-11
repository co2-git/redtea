"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = describe;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Describe = function Describe(label, that, assert) {
  _classCallCheck(this, Describe);

  this.label = label;
  this.that = that;
  this.assert = assert;
};

function describe(label, that, assert) {
  return function () {
    return new Describe(label, that, assert);
  };
}

var Batch = function Batch(label) {
  _classCallCheck(this, Batch);

  this.label = label;

  for (var _len = arguments.length, tests = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    tests[_key - 1] = arguments[_key];
  }

  this.tests = tests;
};

describe.batch = function batch(label) {
  for (var _len2 = arguments.length, tests = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    tests[_key2 - 1] = arguments[_key2];
  }

  return function () {
    return new (Function.prototype.bind.apply(Batch, [null].concat([label], tests)))();
  };
};