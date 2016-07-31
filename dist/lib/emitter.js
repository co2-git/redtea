'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redtea_Emitter = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = emitter;

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redtea_Emitter = exports.Redtea_Emitter = function Redtea_Emitter(label, that, assertions) {
  (0, _classCallCheck3.default)(this, Redtea_Emitter);
  this.assertions = {};

  this.label = label;
  this.that = that;
  this.assertions = assertions;
};

function emitter(label, that, assertions) {
  return function () {
    return new Redtea_Emitter(label, that, assertions);
  };
}