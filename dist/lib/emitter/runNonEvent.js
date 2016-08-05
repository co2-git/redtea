'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runEvent;

var _events = require('events');

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _events2 = require('./events');

var EVENTS = _interopRequireWildcard(_events2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runEvent(emitter, watcher, observer, event, wait) {
  return new Promise(function (resolve, reject) {
    try {
      (function () {
        // Timeout in case event never triggered
        var timeout = setTimeout(function () {
          try {
            observer.emit(EVENTS.RESULT, emitter, {
              type: 'event',
              expected: event,
              that: null,
              valid: true,
              message: 'event "' + event + '" should not trigger after ' + wait + ' milliseconds'
            });
            resolve(true);
          } catch (error) {
            resolve(error);
          }
        }, wait);
        // Listen to event
        watcher.on(event, function () {
          clearTimeout(timeout);
          observer.emit(EVENTS.RESULT, emitter, {
            type: 'event',
            expected: event,
            that: null,
            valid: false,
            message: 'event "' + event + '" should not trigger after ' + wait + ' milliseconds'
          });
          resolve(false);
        });
      })();
    } catch (error) {
      reject(error);
    }
  });
}