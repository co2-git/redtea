'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runDescribe;

var _events = require('events');

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _walk = require('../walk');

var _walk2 = _interopRequireDefault(_walk);

var _events2 = require('./events');

var EVENTS = _interopRequireWildcard(_events2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runDescribe(test, emitter) {
  emitter.emit(EVENTS.START, test);
  (0, _walk2.default)(test.that, test.assertions, function (report) {
    emitter.emit(EVENTS.RESULT, { test: test, report: report });
  });
  emitter.emit(EVENTS.END, test);
}