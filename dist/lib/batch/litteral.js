'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = batch;

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function batch(label) {
    for (var _len = arguments.length, tests = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        tests[_key - 1] = arguments[_key];
    }

    return function () {
        return new (Function.prototype.bind.apply(_is2.default, [null].concat([label], (0, _toConsumableArray3.default)(tests))))();
    };
}