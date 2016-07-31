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
  try {
    var promised = promise.that();
    emitter.emit(EVENTS.START, (0, _extends3.default)({}, promise, {
      that: promised
    }));
    promised.then(function (result) {
      (0, _walk2.default)(result, promise.assertions, function (report) {
        emitter.emit(EVENTS.RESULT, { test: promise, report: report });
      });
    }).catch(function (error) {
      (0, _walk2.default)(error, promise.assertions, function (report) {
        emitter.emit(EVENTS.RESULT, { test: promise, report: report });
      });
    });
    emitter.emit(EVENTS.END, promise);
  } catch (error) {
    emitter.emit(EVENTS.ERROR, error);
  }
}