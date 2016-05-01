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

    var test = (0, _is2.default)(subject, value);
    return not ? !test.passed : test.passed;
  }

  function isIndeedNot(value) {
    return isIndeed(value, true);
  }

  function isIndeedA(type) {
    var not = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var test = _is2.default.type(subject, type);
    return not ? !test.passed : test.passed;
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
  isIndeed.null = isIndeed(null);
  isIndeedNot.null = isIndeedNot(null);
  isIndeed.undefined = isIndeed(undefined);
  isIndeedNot.undefined = isIndeedNot(undefined);
  isIndeed.true = isIndeed(true);
  isIndeedNot.true = isIndeedNot(true);
  isIndeed.false = isIndeed(false);
  isIndeedNot.false = isIndeedNot(false);
  isIndeedA.string = isIndeedA(String);
  isIndeedNotA.string = isIndeedNotA(String);

  return {
    is: isIndeed
  };
} /**
    * @name indeed
    * @description test your code boolean-style
    * 
  **/