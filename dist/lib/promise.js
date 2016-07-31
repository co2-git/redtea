'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redtea_Promise = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = promise;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redtea_Promise = exports.Redtea_Promise = function Redtea_Promise(label, that, assertions) {
  (0, _classCallCheck3.default)(this, Redtea_Promise);
  this.assertions = {};

  this.label = label;
  this.that = that;
  this.assertions = assertions;
};

function promise(label, that, assertions) {
  return function () {
    return new Redtea_Promise(label, that, assertions);
  };
}