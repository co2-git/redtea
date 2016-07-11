'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = it;

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function it(that, assertion) {
  var assertions = {};
  if ('value' in assertion) {
    assertions.value = that === assertion.value;
  }
  if ('type' in assertion) {
    assertions.type = (0, _type2.default)(that, assertion.type);
  }
  return assertions;
}