'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = describe;

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function describe(label, that, assertions) {
    return function () {
        return new _is2.default(label, that, assertions);
    };
}