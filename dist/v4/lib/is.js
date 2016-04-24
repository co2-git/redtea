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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var is = function is(subject, value) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  switch (value) {
    case null:
      if (not) {
        if (subject === null) {
          throw new _AssertionError2.default('Expected value not to be null', subject, value);
        }
      } else if (subject !== null) {
        throw new _AssertionError2.default('Expected value to be null', subject, value);
      }
      break;
    case undefined:
      if (not) {
        if (typeof subject === 'undefined') {
          throw new _AssertionError2.default('Expected value not to be undefined', subject, value);
        }
      } else if (typeof subject !== 'undefined') {
        throw new _AssertionError2.default('Expected value to be undefined', subject, value);
      }
      break;
    default:
      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
        case 'string':
        case 'boolean':
          if (not) {
            if (subject === value) {
              throw new _AssertionError2.default('Expected value not to match', subject, value);
            }
          } else if (subject !== value) {
            throw new _AssertionError2.default('Expected value to match', subject, value);
          }
          break;
        case 'object':
          if (not) {
            if (_lodash2.default.isEqual(subject, value)) {
              throw new _AssertionError2.default('Expected value not to match', subject, value);
            }
          } else if (!_lodash2.default.isEqual(subject, value)) {
            throw new _AssertionError2.default('Expected value to match', subject, value);
          }
          break;
        case 'function':
          if (not && subject === value) {
            throw new _AssertionError2.default('Expected value not to match', subject, value);
          } else if (subject !== value) {
            throw new _AssertionError2.default('Expected value to match', subject, value);
          }
          break;
        default:
          throw new _AssertionError2.default('Could not determine value type', subject, value);
      }
      break;
  }
};

is.not = function (subject, value) {
  return is(subject, value, true);
};

is.type = function (subject, type) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if (typeof type !== 'function') {
    throw new Error('Type must be a function');
  }
  switch (type) {
    case String:
      if (not) {
        if (typeof subject === 'string') {
          throw new _AssertionError2.default('Expected subject not to be a String', subject, null, String);
        }
      } else if (typeof subject !== 'string') {
        throw new _AssertionError2.default('Expected subject to be a String', subject, null, String);
      }
      break;
    case Number:
      {
        var isNumber = void 0;
        if (subject === null || typeof subject === 'undefined') {
          isNumber = false;
        } else {
          isNumber = subject.constructor === Number && isFinite(subject);
        }
        if (not) {
          if (isNumber) {
            throw new _AssertionError2.default('Expected subject not to be a Number', subject, null, Number);
          }
        } else if (!isNumber) {
          throw new _AssertionError2.default('Expected subject to be a Number', subject, null, Number);
        }
        break;
      }
    case Boolean:
      if (not) {
        if (typeof subject === 'boolean') {
          throw new _AssertionError2.default('Expected subject not to be a Boolean', subject, null, Boolean);
        }
      } else if (typeof subject !== 'boolean') {
        throw new _AssertionError2.default('Expected subject to be a Boolean', subject, null, Boolean);
      }
      break;
    case Function:
      if (not) {
        if (typeof subject === 'function') {
          throw new _AssertionError2.default('Expected subject not to be a Function', subject, null, Function);
        }
      } else if (typeof subject !== 'function') {
        throw new _AssertionError2.default('Expected subject to be a Function', subject, null, Function);
      }
      break;
    case Object:
      {
        var isObject = subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && !Array.isArray(subject);
        if (not) {
          if (isObject) {
            throw new _AssertionError2.default('Expected subject not to be a Object', subject, null, Object);
          }
        } else if (!isObject) {
          throw new _AssertionError2.default('Expected subject to be a Object', subject, null, Object);
        }
        break;
      }
    case Array:
      if (not) {
        if (Array.isArray(subject)) {
          throw new _AssertionError2.default('Expected subject not to be an Array', subject, null, Array);
        }
      } else if (!Array.isArray(subject)) {
        throw new _AssertionError2.default('Expected subject to be an Array', subject, null, Array);
      }
      break;
    default:
      if (not) {
        if (subject instanceof type) {
          throw new _AssertionError2.default('Expected subject to be a ' + type.name, subject, null, type);
        }
      }
  }
};

is.not.type = function (subject, type) {
  return is.type(subject, type, true);
};

exports.default = is;