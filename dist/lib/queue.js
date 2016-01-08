'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Queue = (function (_EventEmitter) {
  _inherits(Queue, _EventEmitter);

  function Queue() {
    _classCallCheck(this, Queue);

    _get(Object.getPrototypeOf(Queue.prototype), 'constructor', this).apply(this, arguments);

    this.queue = [];
    this.passed = [];
    this.failed = [];
    this.id = 0;
    this.processing = false;
  }

  _createClass(Queue, [{
    key: 'push',
    value: function push(story) {

      story.id = this.id++;

      // console.log('pushing story'.grey.italic, story.label.grey, story.id, story.parent);

      // if ( 'parent' in story ) {
      //   const parent = this.findById(story.parent);
      //
      //   if ( ! parent.children ) {
      //     parent.children = {};
      //   }
      //
      //   parent.children[story.id] = null;
      //
      //   parent.stats.tests ++;
      // }

      this.queue.push(story);

      // console.log(this.processing.toString().magenta);

      if (!this.processing) {
        this.resume();
      }

      return story.id;
    }
  }, {
    key: 'findById',
    value: function findById(id) {
      for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        types[_key - 1] = arguments[_key];
      }

      if (!types.length) {
        types = ['queue', 'passed', 'failed'];
      }

      var all = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(types), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var type = _step.value;

          all.push.apply(all, _toConsumableArray(this[type]));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return all.reduce(function (match, story) {
        if (story.id === id) {
          match = story;
        }
        return match;
      }, null);
    }
  }, {
    key: 'resume',
    value: function resume() {
      var _this = this;

      this.processing = true;

      if (this.queue[0]) {
        // console.log('procesing', this.queue[0].label);
        this.queue[0].story().then(function () {
          // console.log(this.queue[0].tab, '✔'.green.bold, this.queue[0].label.grey);
          _this.emit('success', _this.queue[0]);

          _this.queue[0].success();

          // if ( 'parent' in this.queue[0] ) {
          //   const parent = this.findById(this.queue[0].parent);
          //
          //   // parent.children[this.queue[0].id] = true;
          //
          //   parent.success();
          // }

          _this.passed.push(_this.queue.shift());
          _this.resume();
        }, function (error) {
          // console.log(this.queue[0].tab, '✖'.red.bold, this.queue[0].label.red);

          if (!_this.queue[0].nested) {
            _this.queue[0].error(error);
          }

          // if ( 'parent' in this.queue[0] ) {
          //   const parent = this.findById(this.queue[0].parent);
          //
          //   parent.error(error);
          // }

          _this.failed.push({ error: error, func: _this.queue.shift() });
          _this.resume();
        });
      } else {
        this.processing = false;
      }
    }
  }, {
    key: 'length',
    get: function get() {
      return this.queue.length;
    }
  }]);

  return Queue;
})(_events.EventEmitter);

exports['default'] = Queue;

// export default new Queue();
module.exports = exports['default'];