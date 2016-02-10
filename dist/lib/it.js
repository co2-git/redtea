'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var id = 0;

var It = function (_EventEmitter) {
  _inherits(It, _EventEmitter);

  function It(label, story, parents) {
    _classCallCheck(this, It);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(It).call(this));

    _this.status = 'iddle';
    _this.parents = [];
    _this.children = [];
    _this.passed = [];
    _this.failed = [];


    _this.parents = parents || [];
    _this.label = label;
    _this.story = story;

    if (Array.isArray(story)) {
      _this.story = story[0];
    }

    _this.status = 'ready';
    _this.id = id++;
    return _this;
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
      var _this2 = this;

      return new Promise(function (ok, ko) {

        _this2.start = Date.now();

        _this2.status = 'started';

        var fn = undefined,
            status = undefined;

        new Promise(function (ok, ko) {
          try {

            if (typeof _this2.story !== 'function') {
              (function () {
                var story = _this2.story;
                console.log(story);
                _this2.story = function (it) {
                  it('should be a function', function () {
                    throw new Error('Story must be a function, got ' + (typeof story === 'undefined' ? 'undefined' : _typeof(story)));
                  });
                };
              })();
            }

            fn = _this2.story(function (label, story) {
              var child = new It(label, story, _this2.parents.concat([_this2])).on('test', function (test) {
                _this2.emit('test', test);

                if (test !== child) {
                  _this2.children.push(test);
                }
              }).on('error', _this2.emit.bind(_this2, 'error')).on('failed', function (test) {
                _this2.emit('failed', test);
                _this2.failed.push(test);
              }).on('passed', function (test) {
                _this2.emit('passed', test);
                _this2.passed.push(test);
              });

              _this2.children.push(child);

              // child.run();
            });

            if (fn && typeof fn.then === 'function') {
              return fn.then(ok).catch(function (error) {
                // this.emit('test', this);
                _this2.fails(error);
                return ok();
              });
            }

            ok();
          } catch (error) {
            // this.emit('test', this);
            _this2.end = Date.now();
            _this2.time = _this2.end - _this2.start;
            _this2.fails(error);
            return ok();
          }
        }).then(function () {
          _this2.emit('test', _this2);

          (0, _promiseSequencer2.default)(_this2.children.map(function (child) {
            return function () {
              return child.run();
            };
          })).then(function () {
            // console.log('all child OK'.green, this.label);

            _this2.end = Date.now();
            _this2.time = _this2.end - _this2.start;

            if (_this2.status !== 'failed') {
              _this2.emit('passed', _this2);

              _this2.status = 'passed';
            }

            ok(_this2);
          }).catch(function (error) {
            _this2.end = Date.now();
            _this2.time = _this2.end - _this2.start;

            _this2.fails(error);
          });
        }).catch(function (error) {
          _this2.end = Date.now();
          _this2.time = _this2.end - _this2.start;

          _this2.fails(error);
        });
      });
    }
  }]);

  return It;
}(_events.EventEmitter);

exports.default = It;