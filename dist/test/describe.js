'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _describe = require('../lib/describe');

exports.default = function () {
  return _describe.describe.batch('Describe', function () {
    return _describe.describe.batch('Promise', function () {
      return (0, _describe.describe)(new Promise(function (r1) {
        return r1(1);
      }), _describe.it.is(1));
    });
  });
};