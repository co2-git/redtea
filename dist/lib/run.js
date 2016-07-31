'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = run;

var _events = require('events');

var _runAsync = require('./runAsync');

var _runAsync2 = _interopRequireDefault(_runAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function run() {
  var _this = this;

  for (var _len = arguments.length, testers = Array(_len), _key = 0; _key < _len; _key++) {
    testers[_key] = arguments[_key];
  }

  var emitter = new _events.EventEmitter();
  process.nextTick((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            emitter.emit('start');
            _context.next = 4;
            return _runAsync2.default.apply(undefined, [emitter].concat((0, _toConsumableArray3.default)(testers)));

          case 4:
            emitter.emit('done');
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            emitter.emit('error', _context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 7]]);
  })));
  return emitter;
}