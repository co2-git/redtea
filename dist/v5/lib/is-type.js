'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = isType;
function isType(it, type) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if (typeof type !== 'function') {
    throw new Error('Type must be a function');
  }
  var passed = void 0;
  switch (type) {
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
        passed = it && (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' && !Array.isArray(it);
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