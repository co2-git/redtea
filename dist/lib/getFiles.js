'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = getFiles;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function flattenArray(arr) {
  return arr.reduce(function (reduced, item) {
    if (Array.isArray(item)) {
      reduced.push.apply(reduced, (0, _toConsumableArray3.default)(flattenArray(item)));
    } else {
      reduced.push(item);
    }
    return reduced;
  }, []);
}

function scandir(dir) {
  return new Promise(function (resolve, reject) {
    var files = [];
    _fsExtra2.default.walk(dir).on('error', reject).on('data', function (file) {
      if (file.path.replace(/\/$/, '') !== dir.replace(/\/$/, '')) {
        files.push(file.path);
      }
    }).on('end', function () {
      return resolve(files);
    });
  });
}

function getFile(file) {
  var _this = this;

  return new Promise(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
      var is_absolute, absolute, formatted_file, stat, files, _files;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              is_absolute = /^\//.test(file);
              absolute = _path2.default.join(process.cwd(), file);
              formatted_file = is_absolute ? file : absolute;
              _context.next = 6;
              return _promiseSequencer2.default.promisify(_fsExtra2.default.stat, [formatted_file]);

            case 6:
              stat = _context.sent;

              if (!stat.isDirectory()) {
                _context.next = 17;
                break;
              }

              _context.next = 10;
              return scandir(file);

            case 10:
              files = _context.sent;
              _context.next = 13;
              return getFiles.apply(undefined, (0, _toConsumableArray3.default)(files));

            case 13:
              _files = _context.sent;

              resolve(_files);
              _context.next = 18;
              break;

            case 17:
              resolve(file);

            case 18:
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](0);

              console.log('getFile', _context.t0);
              reject(_context.t0);

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 20]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

function getFiles() {
  var _this2 = this;

  for (var _len = arguments.length, files = Array(_len), _key = 0; _key < _len; _key++) {
    files[_key] = arguments[_key];
  }

  return new Promise(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
      var results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, result;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              results = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 5;
              _iterator = files[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }

              file = _step.value;
              _context2.next = 11;
              return getFile(file);

            case 11:
              result = _context2.sent;

              results.push(result);

            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 7;
              break;

            case 16:
              _context2.next = 22;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 22:
              _context2.prev = 22;
              _context2.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context2.prev = 25;

              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context2.finish(25);

            case 29:
              return _context2.finish(22);

            case 30:
              resolve(flattenArray(results).reduce(function (unique, result) {
                if (unique.indexOf(result) === -1) {
                  unique.push(result);
                }
                return unique;
              }, []));
              _context2.next = 37;
              break;

            case 33:
              _context2.prev = 33;
              _context2.t1 = _context2['catch'](0);

              console.log('getFiles', _context2.t1);
              reject(_context2.t1);

            case 37:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 33], [5, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
}