'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = walk;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walk(that, assertions, reporter) {
  var not = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  for (var type in assertions) {
    switch (type) {
      default:
        {
          break;
        }
      case 'not':
        {
          walk(that, assertions.not, reporter, true);
          break;
        }
      case 'value':
        {
          var valid = _lodash2.default.isEqual(that, assertions.value);
          reporter({
            type: type,
            expected: not ? { not: assertions[type] } : assertions[type],
            that: that,
            valid: not ? !valid : valid,
            message: 'is ' + (not ? 'not ' : '') + (0, _format2.default)(assertions.value)
          });
          break;
        }
      case 'type':
        {
          var isA = void 0;
          if (Array.isArray(assertions.type)) {
            isA = assertions.type[0] ? assertions.type[0].name : (0, _format2.default)(assertions.type[0]);
            isA = 'is an array of ' + isA;
          } else {
            isA = assertions.type ? assertions.type.name : (0, _format2.default)(assertions.type);
          }
          var an = /^(a|i|o|u|e)/i.test(isA) ? 'an' : 'a';
          var _valid = (0, _type2.default)(that, assertions.type);
          reporter({
            type: type,
            expected: assertions.type,
            that: that,
            valid: not ? !_valid : _valid,
            message: 'is ' + (not ? 'not ' : '') + an + ' ' + isA
          });
          break;
        }
      case 'types':
        {
          var _valid2 = assertions.types.every(function (type) {
            return (0, _type2.default)(that, type);
          });
          reporter({
            type: type,
            expected: assertions.types,
            that: that,
            valid: not ? !_valid2 : _valid2,
            message: 'is ' + (not ? 'not ' : '') + ' an instance of ' + ('' + assertions.types.map(function (type) {
              return (0, _format2.default)(type).replace(/^function /, '');
            }).join(', '))
          });
          break;
        }
      case 'shape':
        {
          console.log({ that: that, assertions: assertions });
        }
    }
  }
}