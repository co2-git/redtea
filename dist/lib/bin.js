'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

      return new _Promise(function (ok, ko) {
        try {

          var promises = files.map(function (file) {
            return new _Promise(function (ok, ko) {

              try {

                var absolutePath = /^\//.test(file) ? file : _path2['default'].join(process.cwd(), file);

                _this2.getFile(absolutePath).then(ok, ko);
              } catch (error) {
                ko(error);
              }
            });
          });

          _Promise.all(promises).then(ok, ko);
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
        return new _Promise(function (ok, ko) {
          if (stat.isDirectory()) {
            _this3.scandir(file).then(function (files) {
              _this3.getFiles.apply(_this3, _toConsumableArray(files)).then(ok, ko);
            })['catch'](ko);
          } else {
            _this3.files.push(file);
            ok();
          }
        });
      });
    }
  }, {
    key: 'scandir',
    value: function scandir(dir) {
      return new _Promise(function (ok, ko) {

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
        return new _Promise(function (ok, ko) {
          if (_this4.flags.indexOf('fork') > -1) {
            _this4.required.push(_this4.fork(file));
          } else {
            _this4.required.push(require(file));
          }
          ok();
        });
      });

      return _Promise.all(requires);
    }
  }, {
    key: 'runFunctions',
    value: function runFunctions() {
      var _this5 = this;

      return (0, _sequencer2['default'])(this.required.map(function (fn) {
        return function () {
          return new _Promise(function (ok, ko) {
            fn().then(function (stats) {
              _this5.tests += stats.tests;
              _this5.passed += stats.passed;
              _this5.failed += stats.failed;
              _this5.time += stats.time;
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
        return new _Promise(function (ok, ko) {
          var child = _child_process2['default'].fork(_path2['default'].resolve(__dirname, '../bin/index.js'), [file]);

          child.on('error', ko).on('exit', function () {
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