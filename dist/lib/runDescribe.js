'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runDescribe;

var _events = require('events');

var _describe = require('./describe');

var _walk = require('./walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runDescribe(test) {
  var emitter = new _events.EventEmitter();
  process.nextTick(function () {
    emitter.emit('start describe', test);
    (0, _walk2.default)(test.that, test.assert, function (report) {
      emitter.emit('describe result', { test: test, report: report });
    });
    emitter.emit('done describe', test);
  });
  return emitter;
}