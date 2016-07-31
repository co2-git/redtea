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
              _context.next = 31;
              break;
            }

            tester = _step.value;

            if (!(typeof tester !== 'function')) {
              _context.next = 9;
              break;
            }

            throw new Error('Test must be a function');

          case 9:
            result = tester();

            if (!(result instanceof _batch.Redtea_Batch)) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return (0, _runRunBatch2.default)(emitter, result);

          case 13:
            _context.next = 28;
            break;

          case 15:
            if (!(result instanceof _describe.Redtea_Describe)) {
              _context.next = 20;
              break;
            }

            _context.next = 18;
            return (0, _runRunDescribe2.default)(emitter, result);

          case 18:
            _context.next = 28;
            break;

          case 20:
            if (!(result instanceof _emitter.Redtea_Emitter)) {
              _context.next = 25;
              break;
            }

            _context.next = 23;
            return (0, _runRunEmitter2.default)(emitter, result);

          case 23:
            _context.next = 28;
            break;

          case 25:
            if (!(result instanceof _promise.Redtea_Promise)) {
              _context.next = 28;
              break;
            }

            _context.next = 28;
            return (0, _runRunPromise2.default)(emitter, result);

          case 28:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 31:
            _context.next = 37;
            break;

          case 33:
            _context.prev = 33;
            _context.t0 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 37:
            _context.prev = 37;
            _context.prev = 38;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 40:
            _context.prev = 40;

            if (!_didIteratorError) {
              _context.next = 43;
              break;
            }

            throw _iteratorError;

          case 43:
            return _context.finish(40);

          case 44:
            return _context.finish(37);

          case 45:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 33, 37, 45], [38,, 40, 44]]);
  }));

  return function runAsync(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _events = require('events');

var _batch = require('./batch');

var _describe = require('./describe');

var _emitter = require('./emitter');

var _promise = require('./promise');

var _runRunBatch = require('./runRunBatch');

var _runRunBatch2 = _interopRequireDefault(_runRunBatch);

var _runRunDescribe = require('./runRunDescribe');

var _runRunDescribe2 = _interopRequireDefault(_runRunDescribe);

var _runRunEmitter = require('./runRunEmitter');

var _runRunEmitter2 = _interopRequireDefault(_runRunEmitter);

var _runRunPromise = require('./runRunPromise');

var _runRunPromise2 = _interopRequireDefault(_runRunPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = runAsync;