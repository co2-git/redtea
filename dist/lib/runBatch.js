'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = run_batch;

var _events = require('events');

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

var _batch = require('./batch');

var _BatchEmitter = require('./BatchEmitter');

var _BatchEmitter2 = _interopRequireDefault(_BatchEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function run_batch(batch) {
  var emitter = new _events.EventEmitter();
  new _BatchEmitter2.default(_run2.default.apply(undefined, (0, _toConsumableArray3.default)(batch.tests)), emitter);
  process.nextTick(emitter.emit.bind(emitter, 'start batch', batch));
  return emitter;
}