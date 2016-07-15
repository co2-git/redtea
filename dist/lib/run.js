'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = run;

var _batch = require('./batch');

var _batch2 = _interopRequireDefault(_batch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function run(tab) {
  var _this = this;

  for (var _len = arguments.length, testers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    testers[_key - 1] = arguments[_key];
  }

  return new Promise(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tester, result;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              tab += '  ';
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = testers[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 26;
                break;
              }

              tester = _step.value;
              result = tester();

              if (!(result.constructor.name === 'Batch')) {
                _context.next = 15;
                break;
              }

              _context.next = 13;
              return __batch(result);

            case 13:
              _context.next = 22;
              break;

            case 15:
              if (!(result.constructor.name === 'Describe')) {
                _context.next = 19;
                break;
              }

              __describe(result);
              _context.next = 22;
              break;

            case 19:
              if (!(result.constructor.name === '_Promise')) {
                _context.next = 22;
                break;
              }

              _context.next = 22;
              return __promise(result);

            case 22:
              console.log();

            case 23:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 26:
              _context.next = 32;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 32:
              _context.prev = 32;
              _context.prev = 33;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 35:
              _context.prev = 35;

              if (!_didIteratorError) {
                _context.next = 38;
                break;
              }

              throw _iteratorError;

            case 38:
              return _context.finish(35);

            case 39:
              return _context.finish(32);

            case 40:
              tab = tab.replace(/ {2}$/, '');
              resolve();
              _context.next = 47;
              break;

            case 44:
              _context.prev = 44;
              _context.t1 = _context['catch'](0);

              reject(_context.t1);

            case 47:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 44], [5, 28, 32, 40], [33,, 35, 39]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}