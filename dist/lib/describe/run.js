'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _events = require('events');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
  (0, _walk2.default)((0, _extends3.default)({}, _lodash2.default.pick(test, ['that', 'assertions']), {
    report: function report(_report) {
      emitter.emit(EVENTS.RESULT, test, _report);
    }
  }));
  emitter.emit(EVENTS.END, test);
}
exports.default = runDescribe;