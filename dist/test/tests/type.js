'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _2.default.batch('Test type', (0, _2.default)('null', null, { type: null }), (0, _2.default)('number', 1, { type: Number }), (0, _2.default)('string', 'a', { type: String }), (0, _2.default)('boolean', true, { type: Boolean }));