'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promise = exports.batch = undefined;

var _describe = require('./lib/describe');

var _describe2 = _interopRequireDefault(_describe);

var _batch = require('./lib/batch');

var _batch2 = _interopRequireDefault(_batch);

var _promise = require('./lib/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_describe2.default.batch = _batch2.default;
_describe2.default.promise = _promise2.default;

exports.default = _describe2.default;
exports.batch = _batch2.default;
exports.promise = _promise2.default;