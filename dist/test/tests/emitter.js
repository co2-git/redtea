'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emitter = function (_EventEmitter) {
  (0, _inherits3.default)(Emitter, _EventEmitter);

  function Emitter() {
    (0, _classCallCheck3.default)(this, Emitter);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Emitter).call(this));

    process.nextTick(function () {
      _this.emit('start', 1, true);
      _this.emit('forEach', 1, 2, 3, 4);
    });
    setTimeout(function () {
      _this.emit('emitsTooLate');
    }, 1000);
    return _this;
  }

  return Emitter;
}(_events.EventEmitter);

exports.default = (0, _.batch)('RedTea use cases', (0, _.batch)('Regular tests', (0, _2.default)('Null', null, {
  type: null,
  value: null,
  not: {
    type: Boolean,
    value: true
  }
}), (0, _2.default)('Boolean', true, {
  type: Boolean,
  value: true,
  not: {
    type: Number,
    value: false
  }
}), (0, _2.default)('Number', 1, {
  type: Number,
  value: 1,
  not: {
    type: String,
    value: 0
  }
})), (0, _.batch)('Promises', (0, _.promise)('Verify then()', function () {
  return new Promise(function (resolve) {
    resolve(1);
  });
}, { value: 1 }), (0, _.promise)('Verify catch()', function () {
  return new Promise(function (resolve, reject) {
    reject(new Error('Ouch!'));
  });
}, { type: Error })), (0, _.batch)('Emitter', (0, _.emitter)('My Custom Emitter', function () {
  return new Emitter();
}, {
  emits: {
    start: {
      wait: 500,
      messages: [{
        value: 1,
        type: Number
      }, {
        value: true,
        type: Boolean,
        not: {
          value: false
        }
      }]
    },
    neverEmits: {
      wait: 500
    },
    emitsTooLate: {
      wait: 500
    },
    forEach: {
      messages: {
        type: Number
      }
    }
  },
  emitsNot: {
    foo: 1000
  }
})));