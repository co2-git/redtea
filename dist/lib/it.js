'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _sequencer = require('sequencer');

var _sequencer2 = _interopRequireDefault(_sequencer);

var id = 0;

var It = (function (_EventEmitter) {
  _inherits(It, _EventEmitter);

  function It(label, story, parents) {
    _classCallCheck(this, It);

    _get(Object.getPrototypeOf(It.prototype), 'constructor', this).call(this);

    this.status = 'iddle';
    this.parents = [];
    this.children = [];
    this.passed = [];
    this.failed = [];
    this.parents = parents || [];
    this.label = label;
    this.story = story;

    if (Array.isArray(story)) {
      this.story = story[0];
    }

    this.status = 'ready';
    this.id = id++;
  }

  _createClass(It, [{
    key: 'fails',
    value: function fails(error) {
      this.error = error;
      this.status = 'failed';
      this.emit('failed', this);
    }
  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      return new Promise(function (ok, ko) {

        _this.start = Date.now();

        _this.status = 'started';

        var fn = undefined,
            status = undefined;

        new Promise(function (ok, ko) {
          try {

            if (typeof _this.story !== 'function') {
              (function () {
                var story = _this.story;
                console.log(story);
                _this.story = function (it) {
                  it('should be a function', function () {
                    throw new Error('Story must be a function, got ' + typeof story);
                  });
                };
              })();
            }

            fn = _this.story(function (label, story) {
              var child = new It(label, story, _this.parents.concat([_this])).on('test', function (test) {
                _this.emit('test', test);

                if (test !== child) {
                  _this.children.push(test);
                }
              }).on('error', _this.emit.bind(_this, 'error')).on('failed', function (test) {
                _this.emit('failed', test);
                _this.failed.push(test);
              }).on('passed', function (test) {
                _this.emit('passed', test);
                _this.passed.push(test);
              });

              _this.children.push(child);

              // child.run();
            });

            if (fn && typeof fn.then === 'function') {
              return fn.then(ok)['catch'](function (error) {
                // this.emit('test', this);
                _this.fails(error);
                return ok();
              });
            }

            ok();
          } catch (error) {
            // this.emit('test', this);
            _this.end = Date.now();
            _this.time = _this.end - _this.start;
            _this.fails(error);
            return ok();
          }
        }).then(function () {
          _this.emit('test', _this);

          (0, _sequencer2['default'])(_this.children.map(function (child) {
            return function () {
              return child.run();
            };
          })).then(function () {
            // console.log('all child OK'.green, this.label);

            _this.end = Date.now();
            _this.time = _this.end - _this.start;

            if (_this.status !== 'failed') {
              _this.emit('passed', _this);

              _this.status = 'passed';
            }

            ok(_this);
          })['catch'](function (error) {
            _this.end = Date.now();
            _this.time = _this.end - _this.start;

            _this.fails(error);
          });
        })['catch'](function (error) {
          _this.end = Date.now();
          _this.time = _this.end - _this.start;

          _this.fails(error);
        });
      });
    }
  }]);

  return It;
})(_events.EventEmitter);

exports['default'] = It;
module.exports = exports['default'];