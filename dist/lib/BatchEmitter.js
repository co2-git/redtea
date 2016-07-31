'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

var _DescribeEmitter = require('./DescribeEmitter');

var _DescribeEmitter2 = _interopRequireDefault(_DescribeEmitter);

var _AllEmitter = require('./AllEmitter');

var _AllEmitter2 = _interopRequireDefault(_AllEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BatchEmitter = function (_EventEmitter) {
  (0, _inherits3.default)(BatchEmitter, _EventEmitter);

  function BatchEmitter(reporter, watcher) {
    (0, _classCallCheck3.default)(this, BatchEmitter);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(BatchEmitter).call(this));

    BatchEmitter.events.forEach(function (event) {
      reporter.on(event, watcher.emit.bind(watcher, event));
    });
    return _this;
  }

  return BatchEmitter;
}(_events.EventEmitter);

BatchEmitter.events = ['error', 'start batch', 'done batch'].concat((0, _toConsumableArray3.default)(_DescribeEmitter2.default.events), (0, _toConsumableArray3.default)(_AllEmitter2.default.ownEvents));
exports.default = BatchEmitter;