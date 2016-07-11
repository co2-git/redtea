'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _events = require('events');

var _it = require('./lib/it');

var _it2 = _interopRequireDefault(_it);

var _is = require('./lib/is');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [runAll].map(regeneratorRuntime.mark);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Emitter = function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);

  function Emitter(subject, describer) {
    _classCallCheck(this, Emitter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Emitter).call(this));

    _this.subject = subject;
    _this.describer = describer;
    _this._emit('describe', _this);
    _this.result = describer(subject);
    _this._emit(_this.result.passed ? 'passed' : 'failed');
    _this._emit('done');
    return _this;
  }

  _createClass(Emitter, [{
    key: '_emit',
    value: function _emit() {
      var _this2 = this;

      for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
        messages[_key] = arguments[_key];
      }

      process.nextTick(function () {
        return _this2.emit.apply(_this2, messages);
      });
    }
  }]);

  return Emitter;
}(_events.EventEmitter);

function run(subject, describer) {
  return new Emitter(subject, describer);
}

function runAll(subject) {
  var cursor,
      _args = arguments;
  return regeneratorRuntime.wrap(function runAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cursor = 0;

        case 1:
          if (!(_args.length <= cursor + 1 ? undefined : _args[cursor + 1])) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return run(subject, _args.length <= cursor + 1 ? undefined : _args[cursor + 1]);

        case 4:
          cursor++;
          _context.next = 1;
          break;

        case 7:
          return _context.abrupt('return', true);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function describe(subject) {
  var results = [];
  var emitter = new _events.EventEmitter();

  for (var _len2 = arguments.length, describers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    describers[_key2 - 1] = arguments[_key2];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = runAll.apply(undefined, [subject].concat(describers))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var result = _step.value;

      results.push(result);
      if (result.passed) {
        emit(emitter, 'passed', subject, result);
      } else {
        emit(emitter, 'failed', subject, result);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  emit(emitter, 'done');
}

describe(1, _it2.default.is(1), _it2.default.is.a.number);