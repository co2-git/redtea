"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redtea_Batch = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = batch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redtea_Batch = exports.Redtea_Batch = function Redtea_Batch(label) {
  (0, _classCallCheck3.default)(this, Redtea_Batch);

  this.label = label;

  for (var _len = arguments.length, tests = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    tests[_key - 1] = arguments[_key];
  }

  this.tests = tests;
};

function batch(label) {
  for (var _len2 = arguments.length, tests = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    tests[_key2 - 1] = arguments[_key2];
  }

  return function () {
    return new (Function.prototype.bind.apply(Redtea_Batch, [null].concat([label], tests)))();
  };
}