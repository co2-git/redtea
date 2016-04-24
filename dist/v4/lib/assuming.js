'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assuming;

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assuming(subject) {
  function asumingThat(value) {
    var not = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (not) {
      _is2.default.not(subject, value);
    } else {
      (0, _is2.default)(subject, value);
    }
  }

  function asumingThatNot(value) {
    return asumingThat(value, true);
  }

  function asumingThatA(type) {
    var not = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (not) {
      _is2.default.not.type(subject, type);
    } else {
      _is2.default.type(subject, type);
    }
  }

  function asumingThatNotA(type) {
    asumingThatA(type, true);
  }

  // eslint (a is too shot)
  var aa = 'a';

  asumingThat[aa] = asumingThatA;
  asumingThat.an = asumingThatA;
  asumingThat.not = asumingThatNot;
  asumingThat.not[aa] = asumingThatNotA;
  asumingThat.not.an = asumingThatNotA;

  return {
    is: asumingThat
  };
} /**
    * @name assuming
    * @description test your code assertion-style
    * 
  **/