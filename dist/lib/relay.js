'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = relay;

var _events = require('events');

function relay(emitter, listener, fn) {
  ['start', 'error', 'new test', 'test done', 'new batch', 'batch done', 'result', 'new event', 'event message', 'event done', 'done'].forEach(function (event) {
    emitter.on(event, listener.emit.bind(listener, event));
  });
  if (typeof fn === 'function') {
    fn(emitter);
  }
}