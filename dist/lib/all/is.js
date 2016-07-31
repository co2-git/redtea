"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var All = function All() {
  (0, _classCallCheck3.default)(this, All);

  for (var _len = arguments.length, tests = Array(_len), _key = 0; _key < _len; _key++) {
    tests[_key] = arguments[_key];
  }

  this.tests = tests;
};

exports.default = All;