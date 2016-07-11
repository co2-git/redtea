'use strict';

require('babel-polyfill');

require('colors');

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

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

function init() {
  var _this = this;

  return new Promise(function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var _files, functions;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _getFiles2.default.apply(undefined, files);

            case 3:
              _files = _context.sent;
              functions = (0, _getFunctions2.default)(_files);


              run.apply(undefined, _toConsumableArray(functions));

              console.log();
              console.log(tests + ' tests, ' + passed + ' passed, ' + failed + ' failed');
              console.log();

              if (failed) {
                reject(new Error('Tests are failing'));
              }
              resolve();
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](0);

              reject(_context.t0);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 13]]);
    }));

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }());
}

function run() {
  tab += '  ';

  for (var _len = arguments.length, testers = Array(_len), _key = 0; _key < _len; _key++) {
    testers[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = testers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var tester = _step.value;

      var result = tester();
      if (result.constructor.name === 'Batch') {
        console.log(tab.black, result.label.underline);
        run.apply(undefined, _toConsumableArray(result.tests));
      } else if (result.constructor.name === 'Describe') {
        console.log(tab.black, result.label.italic, (0, _format2.default)(result.that).grey);
        for (var attr in result.assert) {
          if (attr === 'value') {
            tests++;
            if (_lodash2.default.isEqual(result.that, result.assert.value)) {
              passed++;
              console.log((tab + '  ').black, '√ Value matches'.green);
            } else {
              failed++;
              console.log((tab + '  ').black, '✖ Value does not match'.bold.red);
              console.log((tab + '  ').black, ('Expected value <' + (0, _format2.default)(result.that) + '> to match ' + ('<' + (0, _format2.default)(result.assert.value) + '>')).yellow);
            }
          } else if (attr === 'type') {
            tests++;
            if ((0, _type2.default)(result.that, result.type)) {
              passed++;
              console.log(tab + '    ', '√');
            }
          }
        }
      }
      console.log();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  tab = tab.replace(/ {2}$/, '');
}

init().then(function () {
  return console.log();
}).catch(function (error) {
  throw error;
});