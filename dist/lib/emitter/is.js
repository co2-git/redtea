'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emitter = function Emitter(label, that, assertions) {
  (0, _classCallCheck3.default)(this, Emitter);

  this.label = label;
  this.that = that;
  this.assertions = assertions;
};

exports.default = Emitter;