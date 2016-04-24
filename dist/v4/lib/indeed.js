'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indeed;

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function indeed(subject) {
  function isIndeed(value) {
    var not = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    try {
      if (not) {
        _is2.default.not(subject, value);
      } else {
        (0, _is2.default)(subject, value);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  function isIndeedNot(value) {
    return isIndeed(value, true);
  }

  function isIndeedA(type) {
    var not = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    try {
      if (not) {
        _is2.default.not.type(subject, type);
      } else {
        _is2.default.type(subject, type);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  function isIndeedNotA(type) {
    return isIndeedA(type, true);
  }

  // eslint (a is too shot)
  var aa = 'a';

  isIndeed[aa] = isIndeedA;
  isIndeed.an = isIndeedA;
  isIndeed.not = isIndeedNot;
  isIndeed.not[aa] = isIndeedNotA;
  isIndeed.not.an = isIndeedNotA;

  return {
    is: isIndeed
  };
} /**
    * @name indeed
    * @description test your code boolean-style
    * 
  **/