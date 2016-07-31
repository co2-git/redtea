'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = runPromise;

var _events = require('events');

var _promise = require('./promise');

var _walk = require('./walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runPromise(test) {
  var emitter = new _events.EventEmitter();
  process.nextTick(function () {
    try {
      var promise = test.that();
      emitter.emit('start', (0, _extends3.default)({}, test, {
        that: promise
      }));
      promise.then(function (result) {
        (0, _walk2.default)(result, test.assertions, function (report) {
          emitter.emit('result', { test: test, report: report });
        });
      }).catch(function (error) {
        (0, _walk2.default)(error, test.assertions, function (report) {
          emitter.emit('result', { test: test, report: report });
        });
      });
      emitter.emit('done', test);
    } catch (error) {
      emitter.emit('error', error);
    }
  });
  return emitter;
}