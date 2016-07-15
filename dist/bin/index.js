#! /usr/bin/env node
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
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
                        return run.apply(undefined, (0, _toConsumableArray3.default)(functions));

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

              return function (_x, _x2) {
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

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

require('babel-polyfill');

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _type = require('../lib/type');

var _type2 = _interopRequireDefault(_type);

var _format = require('../lib/format');

var _format2 = _interopRequireDefault(_format);

var _getFiles = require('../lib/getFiles');

var _getFiles2 = _interopRequireDefault(_getFiles);

var _getFunctions = require('../lib/getFunctions');

var _getFunctions2 = _interopRequireDefault(_getFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};
var flags = [];
var files = [];

// Process command line arguments
process.argv.filter(function (arg, index) {
  return index > 1;
}).forEach(function (arg) {
  if (/\=/.test(arg)) {
    var bits = arg.split('=');
    props[bits[0]] = bits[1];
  } else if (/^--/.test(arg)) {
    flags.push(arg.replace(/^--/, ''));
  } else {
    files.push(arg);
  }
});

var tab = '';
var tests = 0;
var passed = 0;
var failed = 0;

function __batch(result) {
  var _this2 = this;

  return new Promise(function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(resolve, reject) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              console.log(_colors2.default.black(tab), result.label.underline);
              _context3.next = 4;
              return run.apply(undefined, (0, _toConsumableArray3.default)(result.tests));

            case 4:
              resolve();
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](0);

              reject(_context3.t0);

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());
}

function __eval(that, expected, not, test, okLabel, koLabel, _tab) {
  tests++;
  var valid = not ? !test : test;
  if (valid) {
    passed++;
    console.log(_tab + '    ', not ? _colors2.default.green('√ ' + koLabel, (0, _format2.default)(expected)) : _colors2.default.green('√ ' + okLabel, (0, _format2.default)(expected)));
  } else {
    failed++;
    console.log(_colors2.default.black(_tab + '  '), not ? _colors2.default.bold.red('✖ ' + koLabel, (0, _format2.default)(expected)) : _colors2.default.bold.red('✖ ' + okLabel, (0, _format2.default)(expected)));
  }
}

function walk(that, assertions) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if ('value' in assertions) {
    __eval(that, assertions.value, not, _lodash2.default.isEqual(that, assertions.value), 'Value is', 'Value is not', tab);
  }

  if ('type' in assertions) {
    __eval(that, assertions.type, not, (0, _type2.default)(that, assertions.type), 'Type is', 'Type is not', tab);
  }

  if ('not' in assertions) {
    walk(that, assertions.not, true);
  }

  if ('has' in assertions) {
    if (assertions.has instanceof RegExp || _lodash2.default.isString(that)) {
      var regex = assertions.has instanceof RegExp ? assertions.has : new RegExp(assertions.has);
      __eval(that, assertions.has, not, regex.test(that), 'String matches', 'String does not match', tab);
    } else if (_lodash2.default.isArray(that)) {
      __eval(that, assertions.has, not, _lodash2.default.some(that, function (item) {
        return _lodash2.default.isEqual(item, assertions.has);
      }), 'Array includes', 'Array does not include', tab);
    } else if (_lodash2.default.isObject(that)) {
      if (_lodash2.default.isString(assertions.has)) {
        __eval(that, assertions.has, not, _lodash2.default.has(that, assertions.has), 'Object has property(ies)', 'Object does not have property(ies)', tab);
      } else if (_lodash2.default.isArray(assertions.has)) {
        __eval(that, assertions.has, not, _lodash2.default.every(assertions.has, function (prop) {
          return _lodash2.default.matches(that, prop);
        }), 'Object matches', 'Object does not match', tab);
      } else if (_lodash2.default.isObject(assertions.has)) {
        __eval(that, assertions.has, not, _lodash2.default.matches(that, assertions.has), 'Object matches', 'Object does not match', tab);
      }
    }
  }
}

function __describe(result) {
  console.log(_colors2.default.black(tab), result.label.italic, _colors2.default.grey((0, _format2.default)(result.that)));
  walk(result.that, result.assertions || result.assert);
}

function __promise(result) {
  var _this3 = this;

  return new Promise(function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(resolve, reject) {
      var that;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return result.promise();

            case 3:
              that = _context4.sent;

              __describe((0, _extends3.default)({}, result, {
                that: that
              }));
              resolve();
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4['catch'](0);

              reject(_context4.t0);

            case 11:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this3, [[0, 8]]);
    }));

    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());
}

function run() {
  var _this4 = this;

  for (var _len = arguments.length, testers = Array(_len), _key = 0; _key < _len; _key++) {
    testers[_key] = arguments[_key];
  }

  return new Promise(function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(resolve, reject) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tester, result;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              tab += '  ';
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context5.prev = 5;
              _iterator = testers[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context5.next = 26;
                break;
              }

              tester = _step.value;
              result = tester();

              if (!(result.constructor.name === 'Batch')) {
                _context5.next = 15;
                break;
              }

              _context5.next = 13;
              return __batch(result);

            case 13:
              _context5.next = 22;
              break;

            case 15:
              if (!(result.constructor.name === 'Describe')) {
                _context5.next = 19;
                break;
              }

              __describe(result);
              _context5.next = 22;
              break;

            case 19:
              if (!(result.constructor.name === '_Promise')) {
                _context5.next = 22;
                break;
              }

              _context5.next = 22;
              return __promise(result);

            case 22:
              console.log();

            case 23:
              _iteratorNormalCompletion = true;
              _context5.next = 7;
              break;

            case 26:
              _context5.next = 32;
              break;

            case 28:
              _context5.prev = 28;
              _context5.t0 = _context5['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context5.t0;

            case 32:
              _context5.prev = 32;
              _context5.prev = 33;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 35:
              _context5.prev = 35;

              if (!_didIteratorError) {
                _context5.next = 38;
                break;
              }

              throw _iteratorError;

            case 38:
              return _context5.finish(35);

            case 39:
              return _context5.finish(32);

            case 40:
              tab = tab.replace(/ {2}$/, '');
              resolve();
              _context5.next = 47;
              break;

            case 44:
              _context5.prev = 44;
              _context5.t1 = _context5['catch'](0);

              reject(_context5.t1);

            case 47:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this4, [[0, 44], [5, 28, 32, 40], [33,, 35, 39]]);
    }));

    return function (_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }());
}

init().then(function () {
  return console.log('Tests finished');
}).catch(function (error) {
  console.log(error.stack.yellow);
  process.exit(1);
});