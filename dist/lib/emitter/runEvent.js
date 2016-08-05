'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = runEvent;

var _events = require('events');

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _events2 = require('./events');

var EVENTS = _interopRequireWildcard(_events2);

var _walk = require('../walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runEvent(emitter, watcher, observer, assertion, event) {
  return new Promise(function (resolve, reject) {
    try {
      (function () {
        var _assertion$wait = assertion.wait;
        var wait = _assertion$wait === undefined ? 2500 : _assertion$wait;
        var assertMessages = assertion.messages;
        // Timeout in case event never triggered

        var timeout = setTimeout(function () {
          try {
            observer.emit(EVENTS.RESULT, emitter, {
              type: 'event',
              expected: event,
              that: null,
              valid: false,
              message: 'event "' + event + '" never triggered after ' + wait + ' milliseconds'
            });
            resolve(false);
          } catch (error) {
            resolve(error);
          }
        }, wait);
        // Listen to event
        watcher.on(event, function () {
          for (var _len = arguments.length, eventMessages = Array(_len), _key = 0; _key < _len; _key++) {
            eventMessages[_key] = arguments[_key];
          }

          clearTimeout(timeout);
          observer.emit.apply(observer, [EVENTS.START_EVENT, event].concat((0, _toConsumableArray3.default)(eventMessages)));
          if (Array.isArray(assertMessages)) {
            assertMessages.forEach(function (message, index) {
              observer.emit(EVENTS.EVENT_MESSAGE, eventMessages[index]);
              (0, _walk2.default)({
                that: eventMessages[index],
                assertions: message,
                report: function report(_report) {
                  observer.emit(EVENTS.RESULT, emitter, _report);
                }
              });
            });
          }
          observer.emit.apply(observer, [EVENTS.END_EVENT, event].concat((0, _toConsumableArray3.default)(eventMessages)));
          resolve(true);
        });
      })();
    } catch (error) {
      reject(error);
    }
  });
}