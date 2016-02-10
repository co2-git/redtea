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

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var i = 0;

function flattenArray(arr) {
  return arr.reduce(function (r, i, p) {
    if (Array.isArray(i)) {
      r.push.apply(r, _toConsumableArray(flattenArray(i)));
    } else {
      r.push(i);
    }
    return r;
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

      return new Promise(function (ok, ko) {
        Promise.all(files.map(function (file) {
          return _this2.getFile(file);
        })).then(function (results) {
          results = flattenArray(results).reduce(function (unique, r) {
            if (unique.indexOf(r) === -1) {
              unique.push(r);
            }
            return unique;
          }, []);
          ok(results);
        }).catch(ko);
      });
    }
  }, {
    key: 'getFile',
    value: function getFile(file) {
      var _this3 = this;

      file = /^\//.test(file) ? file : _path2.default.join(process.cwd(), file);

      return _promiseSequencer2.default.pipe(function () {
        return _promiseSequencer2.default.promisify(_fsExtra2.default.stat, [file]);
      }, function (stat) {
        return new Promise(function (ok, ko) {
          if (stat.isDirectory()) {
            _this3.scandir(file).then(function (files) {
              _this3.getFiles.apply(_this3, _toConsumableArray(files)).then(ok, ko);
            }).catch(ko);
          } else {
            ok(file);
          }
        });
      });
    }
  }, {
    key: 'scandir',
    value: function scandir(dir) {
      return new Promise(function (ok, ko) {

        var files = [];

        _fsExtra2.default.walk(dir).on('error', ko).on('data', function (file) {
          if (file.path.replace(/\/$/, '') !== dir.replace(/\/$/, '')) {
            files.push(file.path);
          }
        }).on('end', function () {
          return ok(files);
        });
      });
    }
  }, {
    key: 'getFunctions',
    value: function getFunctions(files) {
      var _this4 = this;

      var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var flags = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return new Promise(function (ok, ko) {
        try {
          var required = files.map(function (file) {
            if (flags.indexOf('fork') > -1) {
              return _this4.fork(file);
            }

            var fn = require(file);

            if (typeof fn.default === 'function') {
              fn = fn.default;
            }

            console.log({ fn: fn });

            if (typeof fn !== 'function') {
              var _ret = function () {
                var serialization = typeof fn === 'undefined' ? 'undefined' : _typeof(fn);

                try {
                  serialization += ' ' + JSON.stringify(fn);
                } catch (error) {}

                return {
                  v: function v(props) {
                    return (0, _2.default)('redtea imports file ' + file, function (it) {
                      it('File should export a function', function () {
                        throw new Error('Expected a function, got ' + serialization);
                      });
                    });
                  }
                };
              }();

              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } else {
              return fn;
            }
          });

          ok(required);
        } catch (error) {
          ko(error);
        }
      });
    }
  }, {
    key: 'fork',
    value: function fork(file) {
      var results = {};

      return function (props) {

        var p = new Promise(function (ok, ko) {
          var child = _child_process2.default.fork(_path2.default.resolve(__dirname, '../bin/index.js'), [file]);

          child.on('error', ko).on('exit', function (status) {
            return ok(results);
          }).on('message', function (message) {

            message = JSON.parse(message);

            if ('redtea' in message) {
              var _message = message;
              var redtea = _message.redtea;


              results = redtea;
            }
          });
        });

        p.live = new _events.EventEmitter();

        return p;
      };
    }
  }, {
    key: 'runFunctions',
    value: function runFunctions(fns) {
      var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var flags = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      var live = new _events.EventEmitter();

      var promise = (0, _promiseSequencer2.default)(fns.map(function (fn) {
        return function () {
          return new Promise(function (ok, ko) {
            var test = fn();

            test.live.on('error', live.emit.bind(live, 'error')).on('test', live.emit.bind(live, 'test')).on('passed', live.emit.bind(live, 'passed')).on('failed', live.emit.bind(live, 'failed'));

            test.then(ok, ko);
          });
        };
      }));

      promise.live = live;

      return promise;
    }
  }]);

  return Bin;
}(_events.EventEmitter);

exports.default = Bin;