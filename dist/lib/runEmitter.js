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

var _walk = require('./walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runEmitter(test) {
  var emitter = new _events.EventEmitter();
  process.nextTick(function () {
    try {
      var watcher = test.that();
      emitter.emit('start', (0, _extends3.default)({}, test, {
        that: watcher
      }));
      if (test.assertions.emits) {
        (function () {
          var expectedNumberOfEvents = Object.keys(test.assertions.emits).length;
          var eventsTriggered = [];
          var eventsNotTriggered = [];
          var done = function done() {
            if (eventsTriggered.length + eventsNotTriggered.length === expectedNumberOfEvents) {
              emitter.emit('done', test);
            }
          };

          var _loop = function _loop(event) {
            var wait = 'wait' in test.assertions.emits[event] ? test.assertions.emits[event].wait : 2500;
            var timeout = setTimeout(function () {
              emitter.emit('result', { test: test, report: {
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
              emitter.emit.apply(emitter, ['event ok', event].concat((0, _toConsumableArray3.default)(messages)));
              if (Array.isArray(test.assertions.emits[event].messages)) {
                test.assertions.emits[event].messages.forEach(function (message, index) {
                  emitter.emit('event message', messages[index]);
                  (0, _walk2.default)(messages[index], message, function (report) {
                    emitter.emit('result', { test: test, report: report });
                  });
                });
              } else {
                // emitter.emit('event message', messages);
                messages.forEach(function (message, index) {
                  (0, _walk2.default)(message, test.assertions.emits[event].messages, function (report) {
                    emitter.emit('result', { test: test, report: report });
                  });
                });
              }
              emitter.emit.apply(emitter, ['event done', event].concat((0, _toConsumableArray3.default)(messages)));
              eventsTriggered.push(event);
              done();
            });
          };

          for (var event in test.assertions.emits) {
            _loop(event);
          }
        })();
      }
    } catch (error) {
      emitter.emit('error', error);
    }
  });
  return emitter;
}