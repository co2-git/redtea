'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = type;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function type(it, type) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var passed = void 0;
  switch (type) {
    case null:
      return it === null;
    case String:
      passed = typeof it === 'string';
      break;
    case Number:
      {
        if (it === null || typeof it === 'undefined') {
          passed = false;
        } else {
          passed = it.constructor === Number && isFinite(it);
        }
        break;
      }
    case Boolean:
      passed = typeof it === 'boolean';
      break;
    case Function:
      passed = typeof it === 'function';
      break;
    case Object:
      {
        passed = it && (typeof it === 'undefined' ? 'undefined' : (0, _typeof3.default)(it)) === 'object' && !Array.isArray(it);
        break;
      }
    case Array:
      passed = Array.isArray(it);
      break;
    default:
      passed = Boolean(it instanceof type);
      break;
  }
  if (not) {
    passed = !passed;
  }
  return passed;
}