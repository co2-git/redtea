'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _is = require('../describe/is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Batch = function Batch(label) {
  (0, _classCallCheck3.default)(this, Batch);

  this.label = label;

  for (var _len = arguments.length, tests = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    tests[_key - 1] = arguments[_key];
  }

  this.tests = tests;
};

exports.default = Batch;