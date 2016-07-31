'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _2.default.batch('Test value', (0, _2.default)('null', null, { value: null }), (0, _2.default)('number', 1, { value: 1 }), (0, _2.default)('string', 'a', { value: 'a' }), (0, _2.default)('boolean', true, { value: true }));