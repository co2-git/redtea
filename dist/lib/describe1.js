'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = describe;

var _Emitter = require('./Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

var _BatchEmitter = require('./BatchEmitter');

var _BatchEmitter2 = _interopRequireDefault(_BatchEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function describe() {
  return new _Emitter2.default();
}

describe.batch = function (label) {
  for (var _len = arguments.length, describers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    describers[_key - 1] = arguments[_key];
  }

  console.log('new batch', label);
  var emitter = new _BatchEmitter2.default(label);

  var cursor = 0;

  function run() {
    console.log('running batch describer', { cursor: cursor, describers: describers.length });
    if (describers[cursor]) {
      describers[cursor]().on('error', function (error) {
        return emitter.emit('error', error);
      }).on('batch', function (_label) {
        return emitter.emit('batch', _label);
      });
    } else {
      console.log('COMPLETE batch');
      emitter.emit('complete');
    }
  }

  run();

  return emitter;
};