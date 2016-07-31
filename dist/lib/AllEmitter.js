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

var _BatchEmitter = require('./BatchEmitter');

var _BatchEmitter2 = _interopRequireDefault(_BatchEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllEmitter = function (_EventEmitter) {
  (0, _inherits3.default)(AllEmitter, _EventEmitter);

  function AllEmitter(reporter, watcher) {
    (0, _classCallCheck3.default)(this, AllEmitter);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(AllEmitter).call(this));

    [].concat((0, _toConsumableArray3.default)(AllEmitter.ownEvents), (0, _toConsumableArray3.default)(AllEmitter.othersEvents)).forEach(function (event) {
      reporter.on(event, watcher.emit.bind(watcher, event));
    });
    return _this;
  }

  return AllEmitter;
}(_events.EventEmitter);

AllEmitter.ownEvents = ['start', 'done', 'error'];
AllEmitter.othersEvents = [].concat((0, _toConsumableArray3.default)(_DescribeEmitter2.default.events), (0, _toConsumableArray3.default)(_BatchEmitter2.default.events));
exports.default = AllEmitter;