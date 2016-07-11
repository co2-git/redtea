'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Emitter = function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);

  function Emitter() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Emitter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Emitter)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.nextTick = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Emitter, [{
    key: 'emit',
    value: function emit() {
      var _this2 = this;

      for (var _len2 = arguments.length, messages = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        messages[_key2] = arguments[_key2];
      }

      if (this.nextTick) {
        var _get2;

        (_get2 = _get(Object.getPrototypeOf(Emitter.prototype), 'emit', this)).call.apply(_get2, [this].concat(messages));
      } else {
        process.nextTick(function () {
          var _get3;

          _this2.nextTick = true;
          (_get3 = _get(Object.getPrototypeOf(Emitter.prototype), 'emit', _this2)).call.apply(_get3, [_this2].concat(messages));
        });
      }
    }
  }]);

  return Emitter;
}(_events.EventEmitter);

exports.default = Emitter;