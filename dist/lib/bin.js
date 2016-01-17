'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _sequencer = require('sequencer');

var _sequencer2 = _interopRequireDefault(_sequencer);

var _ = require('..');

var _2 = _interopRequireDefault(_);

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

var Bin = (function (_EventEmitter) {
  _inherits(Bin, _EventEmitter);

  function Bin() {
    _classCallCheck(this, Bin);

    _get(Object.getPrototypeOf(Bin.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Bin, null, [{
    key: 'getFiles',
    value: function getFiles() {
      var _this = this;

      for (var _len = arguments.length, files = Array(_len), _key = 0; _key < _len; _key++) {
        files[_key] = arguments[_key];
      }

      return new Promise(function (ok, ko) {
        Promise.all(files.map(function (file) {
          return _this.getFile(file);
        })).then(function (results) {
          return ok(flattenArray(results));
        })['catch'](ko);
      });
    }
  }, {
    key: 'getFile',
    value: function getFile(file) {
      var _this2 = this;

      file = /^\//.test(file) ? file : _path2['default'].join(process.cwd(), file);

      return _sequencer2['default'].pipe(function () {
        return _sequencer2['default'].promisify(_fsExtra2['default'].stat, [file]);
      }, function (stat) {
        return new Promise(function (ok, ko) {
          if (stat.isDirectory()) {
            _this2.scandir(file).then(function (files) {
              _this2.getFiles.apply(_this2, _toConsumableArray(files)).then(ok, ko);
            })['catch'](ko);
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

        _fsExtra2['default'].walk(dir).on('error', ko).on('data', function (file) {
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
      var _this3 = this;

      var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var flags = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      return new Promise(function (ok, ko) {
        try {
          var required = files.map(function (file) {
            if (flags.indexOf('fork') > -1) {
              return _this3.fork(file);
            }

            var fn = require(file);

            if (typeof fn !== 'function') {
              var _ret = (function () {
                var serialization = typeof fn;

                try {
                  serialization += ' ' + JSON.stringify(fn);
                } catch (error) {}

                return {
                  v: function (props) {
                    return (0, _2['default'])('redtea imports file ' + file, function (it) {
                      it('File should export a function', function () {
                        throw new Error('Expected a function, got ' + serialization);
                      });
                    });
                  }
                };
              })();

              if (typeof _ret === 'object') return _ret.v;
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
          var child = _child_process2['default'].fork(_path2['default'].resolve(__dirname, '../bin/index.js'), [file]);

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
      var live = new _events.EventEmitter();

      var promise = (0, _sequencer2['default'])(fns.map(function (fn) {
        return function () {
          return new Promise(function (ok, ko) {
            var test = fn();

            test.live.on('error', live.emit.bind(live, 'error')).on('test', live.emit.bind(live, 'test')).on('passed', live.emit.bind(live, 'passed')).on('failed', live.emit.bind(live, 'failed'));

            test.then(function (testResults) {
              // for ( let stat of ['tests', 'passed', 'failed', 'time'] ) {
              //   if ( typeof stats[stat] === 'number' ) {
              //     this[stat] += stats[stat];
              //   }
              // }
              // if ( stats && typeof stats.tests !== 'number' ) {
              //   this.tests ++;
              //   this.failed ++;
              // }
              ok(testResults);
            })['catch'](ko);
          });
        };
      }));

      promise.live = live;

      return promise;
    }
  }]);

  return Bin;
})(_events.EventEmitter);

exports['default'] = Bin;
module.exports = exports['default'];