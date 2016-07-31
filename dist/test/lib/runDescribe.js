'use strict';

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _runDescribe = require('../../lib/runDescribe');

var _runDescribe2 = _interopRequireDefault(_runDescribe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _run2.default)('runDescribe()', [{
  label: 'runDescribe is a function',
  assert: typeof _runDescribe2.default === 'function'
}]);