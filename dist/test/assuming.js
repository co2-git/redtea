'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _describe = require('../lib/describe');

var _assuming = require('../lib/assuming');

var _assuming2 = _interopRequireDefault(_assuming);

var _AssertionError = require('../lib/AssertionError');

var _AssertionError2 = _interopRequireDefault(_AssertionError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _describe.describe.batch('Assuming', function () {
    return _describe.describe.batch('throwing', function () {
      return (0, _describe.describe)(function () {
        return (0, _assuming2.default)(null).is(null);
      }, _describe.it.is.not.throwing(Error));
    }, function () {
      return (0, _describe.describe)(function () {
        return (0, _assuming2.default)(null).is.not(null);
      }, _describe.it.is.throwing(_AssertionError2.default), _describe.it.is.not.throwing(Error));
    });
  });
};