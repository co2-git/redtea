'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = send;

var _events = require('events');

var _events2 = require('./events');

var _events3 = _interopRequireDefault(_events2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function send(reporter, watcher) {
  _events3.default.forEach(function (event) {
    reporter.on(event, watcher.emit.bind(watcher, event));
  });
}