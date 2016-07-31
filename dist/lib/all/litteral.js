'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = run;

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function run() {
    for (var _len = arguments.length, tests = Array(_len), _key = 0; _key < _len; _key++) {
        tests[_key] = arguments[_key];
    }

    return function () {
        return new (Function.prototype.bind.apply(_is2.default, [null].concat((0, _toConsumableArray3.default)(tests))))();
    };
}