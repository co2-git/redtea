'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = runPromise;

var _events = require('events');

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _walk = require('../walk');

var _walk2 = _interopRequireDefault(_walk);

var _events2 = require('./events');

var EVENTS = _interopRequireWildcard(_events2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runPromise(promise, emitter) {
  return new Promise(function (resolve) {
    try {
      (function () {
        var promised = promise.that();
        emitter.emit(EVENTS.START, (0, _extends3.default)({}, promise, {
          that: promised
        }));
        var wait = promise.assertions.wait || 2500;
        var timer = setTimeout(function () {
          emitter.emit(EVENTS.ERROR, promise, new Error('Promise timed out'));
          emitter.emit(EVENTS.END, promise);
          resolve();
        }, wait);
        promised.then(function (result) {
          clearTimeout(timer);
          emitter.emit(EVENTS.PROMISE, promise, result);
          (0, _walk2.default)({
            that: result,
            assertions: promise.assertions,
            report: function report(_report) {
              emitter.emit(EVENTS.RESULT, promise, _report);
            }
          });
          emitter.emit(EVENTS.END, promise);
          resolve();
        }).catch(function (error) {
          clearTimeout(timer);
          emitter.emit(EVENTS.PROMISE, promise, error);
          (0, _walk2.default)({
            that: error,
            assertions: promise.assertions,
            report: function report(_report2) {
              emitter.emit(EVENTS.RESULT, promise, _report2);
            }
          });
          emitter.emit(EVENTS.END, promise);
          resolve();
        });
      })();
    } catch (error) {
      emitter.emit(EVENTS.ERROR, promise, error);
      emitter.emit(EVENTS.END, promise);
      resolve();
    }
  });
}