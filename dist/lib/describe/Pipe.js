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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DescribeEmitter = function (_EventEmitter) {
  (0, _inherits3.default)(DescribeEmitter, _EventEmitter);

  function DescribeEmitter(reporter, watcher) {
    (0, _classCallCheck3.default)(this, DescribeEmitter);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(DescribeEmitter).call(this));

    DescribeEmitter.events.forEach(function (event) {
      reporter.on(event, watcher.emit.bind(watcher, event));
    });
    return _this;
  }

  return DescribeEmitter;
}(_events.EventEmitter);

DescribeEmitter.events = ['error', 'start describe', 'done describe', 'describe result'];
exports.default = DescribeEmitter;