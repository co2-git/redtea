'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indeed;

var _is2 = require('./is');

var _is3 = _interopRequireDefault(_is2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function indeed(subject) {
  var test = {
    is: function is(value) {
      try {
        (0, _is3.default)(subject, value);
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  // eslint (a is too shot)
  var aa = 'a';

  test.is[aa] = function (type) {
    try {
      _is3.default.type(subject, type);
      return true;
    } catch (error) {
      return false;
    }
  };

  test.is.an = test.is.a;

  return test;
} /**
    * @name indeed
    * @description test your code boolean-style
    * 
  **/