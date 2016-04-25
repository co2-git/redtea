'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                    * @name is
                                                                                                                                                                                                                                                    * @description core library with should
                                                                                                                                                                                                                                                    * 
                                                                                                                                                                                                                                                  **/

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AssertionError = require('./AssertionError');

var _AssertionError2 = _interopRequireDefault(_AssertionError);

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var is = function is(subject, value) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var label = (0, _format2.default)(subject) + ' is ' + (not ? 'not ' : '') + (0, _format2.default)(value);
  var passed = void 0;
  switch (value) {
    case null:
      passed = subject === null;
      break;
    case undefined:
      passed = typeof subject === 'undefined';
      break;
    default:
      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
        case 'string':
        case 'boolean':
        case 'function':
          passed = subject === value;
          break;
        case 'object':
          passed = _lodash2.default.isEqual(subject, value);
          break;
        default:
          throw new _AssertionError2.default('Could not determine value type', subject, value);
      }
      break;
  }
  if (not) {
    passed = !passed;
  }
  return { label: label, subject: subject, value: value, passed: passed };
};

is.not = function (subject, value) {
  return is(subject, value, true);
};

is.type = function (subject, type) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if (typeof type !== 'function') {
    throw new Error('Type must be a function');
  }
  var label = (0, _format2.default)(subject) + ' is ' + (not ? 'not ' : '') + 'a ' + type.name;
  var passed = void 0;
  switch (type) {
    case String:
      passed = typeof subject === 'string';
      break;
    case Number:
      {
        if (subject === null || typeof subject === 'undefined') {
          passed = false;
        } else {
          passed = subject.constructor === Number && isFinite(subject);
        }
        break;
      }
    case Boolean:
      passed = typeof subject === 'boolean';
      break;
    case Function:
      passed = typeof subject === 'function';
      break;
    case Object:
      {
        passed = subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && !Array.isArray(subject);
        break;
      }
    case Array:
      passed = Array.isArray(subject);
      break;
    default:
      passed = Boolean(subject instanceof type);
      break;
  }
  if (not) {
    passed = !passed;
  }
  return { label: label, subject: subject, type: type, passed: passed };
};

is.not.type = function (subject, type) {
  return is.type(subject, type, true);
};

exports.default = is;