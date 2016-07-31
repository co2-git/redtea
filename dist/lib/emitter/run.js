'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = runEmitter;

var _events = require('events');

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _events2 = require('./events');

var EVENTS = _interopRequireWildcard(_events2);

var _walk = require('../walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runEmitter(emitter, observer) {
  return new Promise(function (resolve) {
    try {
      var watcher = emitter.that();
      observer.emit(EVENTS.START, (0, _extends3.default)({}, emitter, {
        that: watcher
      }));
      if (emitter.assertions.emits) {
        (function () {
          var expectedNumberOfEvents = Object.keys(emitter.assertions.emits).length;
          var eventsTriggered = [];
          var eventsNotTriggered = [];
          var done = function done() {
            if (eventsTriggered.length + eventsNotTriggered.length === expectedNumberOfEvents) {
              observer.emit(EVENTS.END, emitter);
              resolve();
            }
          };

          var _loop = function _loop(event) {
            var wait = 'wait' in emitter.assertions.emits[event] ? emitter.assertions.emits[event].wait : 2500;
            var timeout = setTimeout(function () {
              observer.emit(EVENTS.RESULT, { test: emitter, report: {
                  type: 'event',
                  expected: event,
                  that: null,
                  valid: false,
                  message: 'event "' + event + '" never triggered after ' + wait + ' milliseconds'
                } });
              eventsNotTriggered.push(event);
              done();
            }, wait);
            watcher.on(event, function () {
              for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
                messages[_key] = arguments[_key];
              }

              clearTimeout(timeout);
              observer.emit.apply(observer, [EVENTS.START_EVENT, event].concat((0, _toConsumableArray3.default)(messages)));
              if (Array.isArray(emitter.assertions.emits[event].messages)) {
                emitter.assertions.emits[event].messages.forEach(function (message, index) {
                  observer.emit(EVENTS.EVENT_MESSAGE, messages[index]);
                  (0, _walk2.default)(messages[index], message, function (report) {
                    observer.emit(EVENTS.RESULT, { test: emitter, report: report });
                  });
                });
              } else {
                messages.forEach(function (message) {
                  observer.emit(EVENTS.EVENT_MESSAGE, message);
                  (0, _walk2.default)(message, emitter.assertions.emits[event].messages, function (report) {
                    observer.emit(EVENTS.RESULT, { test: emitter, report: report });
                  });
                });
              }
              observer.emit.apply(observer, [EVENTS.END_EVENT, event].concat((0, _toConsumableArray3.default)(messages)));
              eventsTriggered.push(event);
              done();
            });
          };

          for (var event in emitter.assertions.emits) {
            _loop(event);
          }
        })();
      }
    } catch (error) {
      console.log(error);
      observer.emit(EVENTS.ERROR, emitter, error);
    }
  });
}