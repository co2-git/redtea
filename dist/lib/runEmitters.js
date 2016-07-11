'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runEmitters;

require('babel-polyfill');

var _Emitter = require('./Emitter');

var _Emitter2 = _interopRequireDefault(_Emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runEmitters() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  var emitter = new _Emitter2.default();

  process.nextTick(function () {
    var cursor = 0;

    function run() {
      if (functions[cursor]) {
        functions[cursor]().on('error', function (error) {
          return emitter.error(error);
        }).on('batch', function (label) {
          return emitter.emit('batch', label);
        }).on('complete', function () {
          console.log('COMPLETE!!');
          emitter.emit('complete');
          cursor++;
          run();
        });
      } else {
        console.log('OVER');
        emitter.emit('over');
      }
    }

    run();
  });

  return emitter;
}