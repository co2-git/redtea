'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = relay;

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function relay(emitter, listener) {
  var change = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  ['start', 'error', 'new test', 'test done', 'new batch', 'done batch', 'result', 'new event', 'event message', 'event done', 'done'].forEach(function (event) {
    emitter.on(event, function () {
      for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
        messages[_key] = arguments[_key];
      }

      console.log((0, _defineProperty3.default)({}, event, messages));
    });
    if (event in change) {
      emitter.on(event, listener.emit.bind(listener, change[event]));
    } else {
      emitter.on(event, listener.emit.bind(listener, event));
    }
  });
}