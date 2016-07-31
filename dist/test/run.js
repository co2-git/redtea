'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = run;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runAssertion(assertion) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  // console.log('asserting', assertion, ...params);
  if (typeof assertion === 'function') {
    runAssertion(assertion.apply(undefined, params));
  } else if (Array.isArray(assertion)) {
    assertion.forEach(function (as) {
      return runAssertion.apply(undefined, [as].concat(params));
    });
  } else if (typeof assertion === 'boolean') {
    (0, _assert2.default)(assertion);
  }
}

function run(label, tests) {
  var _this = this;

  console.log();
  console.log(_colors2.default.white.bgBlue.bold(label));
  console.log();

  tests.forEach(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(test) {
      var results, event;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!test.promise) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return test.promise();

            case 4:
              results = _context.sent;

              runAssertion(test.assert, results);
              _context.next = 9;
              break;

            case 8:
              if (test.emitter) {
                for (event in test.emitter.events) {
                  test.emitter.on(function (event) {
                    console.log('event', event);
                  });
                }
              } else {
                runAssertion(test.assert);
              }

            case 9:
              console.log(_colors2.default.green(' √ ' + test.label));
              _context.next = 17;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](0);

              console.log(_colors2.default.red('  ✖ ' + test.label));
              console.log(_context.t0.stack);
              process.exit(8);

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 12]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}