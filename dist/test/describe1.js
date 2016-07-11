'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _describe = require('../lib/describe1');

var _describe2 = _interopRequireDefault(_describe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _describe2.default.batch('BATCH 1', function () {
    return _describe2.default.batch('BATCH 1.1');
  });
};