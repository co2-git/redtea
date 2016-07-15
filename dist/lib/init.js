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

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(tests, passed, failed) {
    for (var _len = arguments.length, files = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      files[_key - 3] = arguments[_key];
    }

    var _this = this;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', new Promise(function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
                var _files, functions;

                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _getFiles2.default.apply(undefined, files);

                      case 3:
                        _files = _context.sent;
                        functions = (0, _getFunctions2.default)(_files);
                        _context.next = 7;
                        return _run2.default.apply(undefined, (0, _toConsumableArray3.default)(functions));

                      case 7:

                        console.log();
                        console.log(tests + ' tests, ' + passed + ' passed, ' + failed + ' failed');
                        console.log();

                        if (failed) {
                          reject(new Error('Tests are failing'));
                        }
                        resolve();
                        _context.next = 17;
                        break;

                      case 14:
                        _context.prev = 14;
                        _context.t0 = _context['catch'](0);

                        reject(_context.t0);

                      case 17:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this, [[0, 14]]);
              }));

              return function (_x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function init(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _getFiles = require('./getFiles');

var _getFiles2 = _interopRequireDefault(_getFiles);

var _getFunctions = require('./getFunctions');

var _getFunctions2 = _interopRequireDefault(_getFunctions);

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = init;