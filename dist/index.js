'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _litteral = require('./lib/describe/litteral');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_litteral).default;
  }
});

var _litteral2 = require('./lib/batch/litteral');

Object.defineProperty(exports, 'batch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_litteral2).default;
  }
});

var _litteral3 = require('./lib/promise/litteral');

Object.defineProperty(exports, 'promise', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_litteral3).default;
  }
});

var _litteral4 = require('./lib/emitter/litteral');

Object.defineProperty(exports, 'emitter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_litteral4).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }