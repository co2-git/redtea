'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var runAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(emitter) {
    for (var _len = arguments.length, testers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      testers[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tester, result;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = testers[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 40;
              break;
            }

            tester = _step.value;
            _context.prev = 7;

            if (!(typeof tester !== 'function')) {
              _context.next = 10;
              break;
            }

            throw new Error('Test must be a function');

          case 10:
            result = tester();

            if (!(result instanceof _is2.default)) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return (0, _run2.default)(result, emitter);

          case 14:
            _context.next = 32;
            break;

          case 16:
            if (!(result instanceof _is4.default)) {
              _context.next = 21;
              break;
            }

            _context.next = 19;
            return (0, _run4.default)(result, emitter);

          case 19:
            _context.next = 32;
            break;

          case 21:
            if (!(result instanceof _is6.default)) {
              _context.next = 26;
              break;
            }

            _context.next = 24;
            return (0, _run6.default)(result, emitter);

          case 24:
            _context.next = 32;
            break;

          case 26:
            if (!(result instanceof _is8.default)) {
              _context.next = 31;
              break;
            }

            _context.next = 29;
            return (0, _run8.default)(result, emitter);

          case 29:
            _context.next = 32;
            break;

          case 31:
            throw new Error('Could not guess type of result ' + result.constructor.name);

          case 32:
            _context.next = 37;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context['catch'](7);

            console.log(_context.t0.stack);

          case 37:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 40:
            _context.next = 46;
            break;

          case 42:
            _context.prev = 42;
            _context.t1 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 46:
            _context.prev = 46;
            _context.prev = 47;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 49:
            _context.prev = 49;

            if (!_didIteratorError) {
              _context.next = 52;
              break;
            }

            throw _iteratorError;

          case 52:
            return _context.finish(49);

          case 53:
            return _context.finish(46);

          case 54:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 42, 46, 54], [7, 34], [47,, 49, 53]]);
  }));

  return function runAsync(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _events = require('events');

var _is = require('../batch/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('../describe/is');

var _is4 = _interopRequireDefault(_is3);

var _is5 = require('../emitter/is');

var _is6 = _interopRequireDefault(_is5);

var _is7 = require('../promise/is');

var _is8 = _interopRequireDefault(_is7);

var _run = require('../batch/run');

var _run2 = _interopRequireDefault(_run);

var _run3 = require('../describe/run');

var _run4 = _interopRequireDefault(_run3);

var _run5 = require('../emitter/run');

var _run6 = _interopRequireDefault(_run5);

var _run7 = require('../promise/run');

var _run8 = _interopRequireDefault(_run7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = runAsync;