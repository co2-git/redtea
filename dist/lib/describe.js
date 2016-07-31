"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redtea_Describe = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = describe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redtea_Describe = exports.Redtea_Describe = function Redtea_Describe(label, that, assert) {
  (0, _classCallCheck3.default)(this, Redtea_Describe);

  this.label = label;
  this.that = that;
  this.assert = assert;
};

function describe(label, that, assert) {
  return function () {
    return new Redtea_Describe(label, that, assert);
  };
}