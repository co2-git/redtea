'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = promise;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Promise = function _Promise(label, _promise, assertions) {
  (0, _classCallCheck3.default)(this, _Promise);
  this.assertions = {};

  this.label = label;
  this.promise = _promise;
  this.assertions = assertions;
};

function promise(label, _promise, assertions) {
  return function () {
    return new _Promise(label, _promise, assertions);
  };
}