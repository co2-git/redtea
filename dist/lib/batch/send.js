'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = send;

var _events = require('events');

var _events2 = require('./events');

var BATCH_EVENTS = _interopRequireWildcard(_events2);

var _events3 = require('../all/events');

var RUN_EVENTS = _interopRequireWildcard(_events3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function send(reporter, watcher) {
  [].concat((0, _toConsumableArray3.default)(BATCH_EVENTS.default), (0, _toConsumableArray3.default)(RUN_EVENTS.default)).forEach(function (event) {
    if (event === RUN_EVENTS.START) {} else if (event === RUN_EVENTS.END) {
      reporter.on(event, function () {
        watcher.emit(BATCH_EVENTS.END);
      });
    } else {
      reporter.on(event, watcher.emit.bind(watcher, event));
    }
  });
}