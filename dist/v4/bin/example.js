'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _describe = require('../lib/describe');

exports.default = function () {
  return _describe.describe.batch('test 1 & 2', function () {
    return (0, _describe.describe)(1, _describe.it.is(1), _describe.it.is.a(Number), _describe.it.is.not(2), _describe.it.is.not.a(String));
  }, function () {
    return (0, _describe.describe)(2, _describe.it.is(2), _describe.it.is.a(Number), _describe.it.is.not(1), _describe.it.is.not.a(Boolean));
  }, function () {
    return _describe.describe.batch('test 3 & 4(with errrors)', function () {
      return (0, _describe.describe)(3, _describe.it.is(3), _describe.it.is.a(Number), _describe.it.is.not(2), _describe.it.is.not.an(Object));
    }, function () {
      return (0, _describe.describe)(4, _describe.it.is(3), _describe.it.is.a(Number), _describe.it.is.not(2), _describe.it.is.not.an(Error));
    });
  });
};