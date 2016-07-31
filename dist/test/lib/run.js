'use strict';

var _events = require('events');

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _describe = require('../../lib/describe');

var _describe2 = _interopRequireDefault(_describe);

var _run3 = require('../../lib/run');

var _run4 = _interopRequireDefault(_run3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var foo = function foo() {
  return (0, _describe2.default)('Value check for number', 1, { value: 1 });
};

var running = (0, _run4.default)(foo);

(0, _run2.default)('run()', [{
  label: 'run is a function',
  assert: typeof _run4.default === 'function'
}, {
  label: 'run() returns an emitter',
  assert: running instanceof _events.EventEmitter
}]);