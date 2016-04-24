'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                    * @name is
                                                                                                                                                                                                                                                    * @description core library with should
                                                                                                                                                                                                                                                    * 
                                                                                                                                                                                                                                                  **/

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var is = function is(subject, value) {
  switch (value) {
    case null:
      (0, _should2.default)(subject).is.null();
      break;
    case undefined:
      (0, _should2.default)(subject).is.undefined();
      break;
    default:
      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
        case 'string':
        case 'boolean':
          (0, _should2.default)(subject).is.exactly(value);
          break;
        case 'object':
          (0, _should2.default)(subject).deepEqual(value);
          break;
      }
      break;
  }
};

is.not = function (subject, value) {
  switch (value) {
    case null:
      (0, _should2.default)(subject).is.not.null();
      break;
    case undefined:
      (0, _should2.default)(subject).is.not.undefined();
      break;
    default:
      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
        case 'string':
        case 'boolean':
          (0, _should2.default)(subject).is.not.exactly(value);
          break;
        case 'object':
          (0, _should2.default)(subject).not.deepEqual(value);
          break;
      }
      break;
  }
};

is.type = function (subject, type) {
  switch (type) {
    case String:
    case Number:
    case Boolean:
      (0, _should2.default)(subject).be.a[type.name]();
      break;
  }
};

exports.default = is;