'use strict';

var _events = require('events');

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _runEmitter = require('../../lib/runEmitter');

var _runEmitter2 = _interopRequireDefault(_runEmitter);

var _emitter = require('../../lib/emitter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var label = 'test emitter';
var emitter = new _events.EventEmitter();
var runned = (0, _runEmitter2.default)(new _emitter.Redtea_Emitter(label, emitter, {}));

(0, _run2.default)('runEmitter()', [{
  label: 'runEmitter is a function',
  assert: typeof _runEmitter2.default === 'function'
}, {
  label: 'runEmitter returns an emitter',
  assert: runned instanceof _events.EventEmitter
}]);

emitter.on('start', function (test) {});