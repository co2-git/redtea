'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

require('colors');

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //  weak

function flattenArray(arr) {
  return arr.reduce(function (reduced, item) {
    if (Array.isArray(item)) {
      reduced.push.apply(reduced, _toConsumableArray(flattenArray(item)));
    } else {
      reduced.push(item);
    }
    return reduced;
  }, []);
}

var Bin = function (_EventEmitter) {
  _inherits(Bin, _EventEmitter);

  function Bin() {
    _classCallCheck(this, Bin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Bin).apply(this, arguments));
  }

  _createClass(Bin, null, [{
    key: 'getFiles',
    value: function getFiles() {
      var _this2 = this;

      for (var _len = arguments.length, files = Array(_len), _key = 0; _key < _len; _key++) {
        files[_key] = arguments[_key];
      }

      return new Promise(function (resolve, reject) {
        Promise.all(files.map(function (file) {
          return _this2.getFile(file);
        })).then(function (results) {
          var flattened_results = flattenArray(results).reduce(function (unique, result) {
            if (unique.indexOf(result) === -1) {
              unique.push(result);
            }
            return unique;
          }, []);
          resolve(flattened_results);
        }).catch(reject);
      });
    }
  }, {
    key: 'getFile',
    value: function getFile(file) {
      var _this3 = this;

      var formatted_file = /^\//.test(file) ? file : _path2.default.join(process.cwd(), file);

      return _promiseSequencer2.default.pipe(function () {
        return _promiseSequencer2.default.promisify(_fsExtra2.default.stat, [formatted_file]);
      }, function (stat) {
        return new Promise(function (resolve, reject) {
          if (stat.isDirectory()) {
            _this3.scandir(file).then(function (files) {
              _this3.getFiles.apply(_this3, _toConsumableArray(files)).then(resolve, reject);
            }).catch(reject);
          } else {
            resolve(file);
          }
        });
      });
    }
  }, {
    key: 'scandir',
    value: function scandir(dir) {
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
  }, {
    key: 'getFunctions',
    value: function getFunctions(files) {
      var _this4 = this;

      var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var flags = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return new Promise(function (resolve, reject) {
        try {
          var required = files.map(function (file) {
            if (flags.indexOf('fork') > -1) {
              return _this4.fork(file);
            }
            var absoluteFile = void 0;

            if (/^\//.test(file)) {
              absoluteFile = file;
            } else {
              absoluteFile = _path2.default.join(process.cwd(), file);
            }

            var fn = require(absoluteFile);

            if (typeof fn.default === 'function') {
              fn = fn.default;
            }

            if (typeof fn !== 'function') {
              var _ret = function () {
                var serialization = typeof fn === 'undefined' ? 'undefined' : _typeof(fn);

                try {
                  serialization += ' ' + JSON.stringify(fn);
                } catch (error) {
                  console.warn('redtea> could not serialize');
                }

                return {
                  v: function v() {
                    return (0, _2.default)('redtea imports file ' + file, function (it) {
                      it('File should export a function', function () {
                        throw new Error('Expected a function, got ' + serialization);
                      });
                    });
                  }
                };
              }();

              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
            return fn;
          });

          resolve(required);
        } catch (error) {
          reject(error);
        }
      });
    }
  }, {
    key: 'fork',
    value: function fork(file) {
      var results = {};

      return function () {
        var promise = (0, _promiseSequencer2.default)(function () {
          return new Promise(function (resolve, reject) {
            var child = _child_process2.default.fork(_path2.default.resolve(__dirname, '../bin/index.js'), [file]);

            child.on('error', reject).on('exit', function () {
              return resolve(results);
            }).on('message', function (message) {
              var parsed_message = JSON.parse(message);

              if ('redtea' in parsed_message) {
                var redtea = parsed_message.redtea;


                results = redtea;
              }
            });
          });
        });
        promise.live = new _events.EventEmitter();
        return promise;
      };
    }
  }, {
    key: 'runFunctions',
    value: function runFunctions(fns) {
      var live = new _events.EventEmitter();

      var eachFunction = function eachFunction(fn) {
        return function () {
          return new Promise(function (resolve, reject) {
            var test = fn();

            test.live.on('error', live.emit.bind(live, 'error')).on('test', live.emit.bind(live, 'test')).on('passed', live.emit.bind(live, 'passed')).on('failed', live.emit.bind(live, 'failed'));

            test.then(resolve, reject);
          });
        };
      };

      var promise = (0, _promiseSequencer2.default)(fns.map(eachFunction));

      promise.live = live;

      return promise;
    }
  }]);

  return Bin;
}(_events.EventEmitter);

exports.default = Bin;