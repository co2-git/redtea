'use strict';

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _run2.default)('index.js [module]', [{
  label: 'describe is a function',
  assert: typeof _2.default === 'function'
}, {
  label: 'describe.batch is a function',
  assert: typeof _2.default.batch === 'function'
}, {
  label: 'describe.promise is a function',
  assert: typeof _2.default.promise === 'function'
}, {
  label: 'describe.emitter is a function',
  assert: typeof _2.default.emitter === 'function'
}, {
  label: 'batch is a function',
  assert: typeof _.batch === 'function'
}, {
  label: 'promise is a function',
  assert: typeof _.promise === 'function'
}, {
  label: 'emitter is a function',
  assert: typeof _.emitter === 'function'
}]);