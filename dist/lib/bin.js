'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

var Bin = (function (_EventEmitter) {
  _inherits(Bin, _EventEmitter);

  function Bin(files, props, flags) {
    var _this = this;

    _classCallCheck(this, Bin);

    _get(Object.getPrototypeOf(Bin.prototype), 'constructor', this).call(this);

    // Start timer

    this.id = i++;
    this.tests = 0;
    this.passed = 0;
    this.failed = 0;
    this.time = 0;
    this.required = [];
    this.dir = '';
    this.files = [];
    this.flags = [];
    this.done = false;
    this.startsAt = Date.now();

    // Begin

    process.nextTick(function () {

      try {
        _this.flags = flags;

        (0, _sequencer2['default'])(function () {
          return _this.getFiles.apply(_this, _toConsumableArray(files));
        }, function () {
          return _this.getFunctions();
        }, function () {
          return _this.runFunctions();
        }).then(function () {

          _this.done = true;

          _this.stopsAt = Date.now();

          _this.emit('passed');
        })['catch'](_this.emit.bind(_this, 'error'));
      } catch (error) {
        _this.emit('error', error);
      }
    });
  }

  _createClass(Bin, [{
    key: 'getFiles',
    value: function getFiles() {
      var _this2 = this;

      for (var _len = arguments.length, files = Array(_len), _key = 0; _key < _len; _key++) {
        files[_key] = arguments[_key];
      }

      return new Promise(function (ok, ko) {
        try {

          var promises = files.map(function (file) {
            return new Promise(function (ok, ko) {

              try {

                var absolutePath = /^\//.test(file) ? file : _path2['default'].join(process.cwd(), file);

                _this2.getFile(absolutePath).then(ok, ko);
              } catch (error) {
                ko(error);
              }
            });
          });

          Promise.all(promises).then(ok, ko);
        } catch (error) {
          ko(error);
        }
      });
    }
  }, {
    key: 'getFile',
    value: function getFile(file) {
      var _this3 = this;

      return (0, _sequencer2['default'])(function () {
        return _sequencer2['default'].promisify(_fsExtra2['default'].stat, [file]);
      }, function (stat) {
        return new Promise(function (ok, ko) {
          if (stat.isDirectory()) {
            _this3.scandir(file).then(function (files) {
              _this3.getFiles.apply(_this3, _toConsumableArray(files)).then(ok, ko);
            })['catch'](ko);
          } else {
            if (_this3.files.indexOf(file) === -1) {
              _this3.files.push(file);
            }
            ok();
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
    value: function getFunctions() {
      var _this4 = this;

      var requires = this.files.map(function (file) {
        return new Promise(function (ok, ko) {

          if (_this4.flags.indexOf('fork') > -1) {
            _this4.required.push(_this4.fork(file));
          } else {
            var fn = require(file);

            if (typeof fn !== 'function') {
              (function () {
                var serialization = typeof fn;

                try {
                  serialization += ' ' + JSON.stringify(fn);
                } catch (error) {}

                _this4.required.push(function (props) {
                  return (0, _2['default'])('redtea imports file ' + file, function (it) {
                    it('File should export a function', function () {
                      throw new Error('Expected a function, got ' + serialization);
                    });
                  });
                });
              })();
            } else {
              _this4.required.push(fn);
            }
          }
          ok();
        });
      });

      return Promise.all(requires);
    }
  }, {
    key: 'runFunctions',
    value: function runFunctions() {
      var _this5 = this;

      return (0, _sequencer2['default'])(this.required.map(function (fn) {
        return function () {
          return new Promise(function (ok, ko) {
            fn().then(function (stats) {
              var _arr = ['tests', 'passed', 'failed', 'time'];

              for (var _i = 0; _i < _arr.length; _i++) {
                var stat = _arr[_i];
                if (typeof stats[stat] === 'number') {
                  _this5[stat] += stats[stat];
                }
              }
              if (typeof stats.tests !== 'number') {
                _this5.tests++;
                _this5.failed++;
              }
              ok();
            })['catch'](ko);
          });
        };
      }));
    }
  }, {
    key: 'fork',
    value: function fork(file) {
      var results = {};

      return function (props) {
        return new Promise(function (ok, ko) {
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
      };
    }
  }]);

  return Bin;
})(_events.EventEmitter);

exports['default'] = Bin;
module.exports = exports['default'];

/** [<function>] */

/** <number> */

/** <number> */

// if paths are relative

/** [<string>]] */

/** [<string>]] */