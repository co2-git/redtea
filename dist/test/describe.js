'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _describe = require('../lib/describe');

exports.default = function () {
  return _describe.describe.batch('Describe', function () {
    return _describe.describe.batch('Simple', function () {
      return (0, _describe.describe)(1, _describe.it.is(1));
    });
  }, function () {
    return _describe.describe.batch('Object', function () {
      return (0, _describe.describe)({ foo: true }, _describe.it.is.an.object(function (key, value) {}), _describe.it.has.property('foo', function (foo) {
        return (0, _describe.describe)(foo, _describe.it.is.true);
      }));
    });
  }, function () {
    return _describe.describe.batch([{ foo: true }, { foo: false }], _describe.it.is.an.array(function (item) {
      (0, _describe.describe)(item, _describe.it.is.an.object);
    }));
  }, function () {
    return _describe.describe.batch('Throw error', function () {
      return (0, _describe.describe)(function () {
        throw new Error('Foo');
      }, _describe.it.throws(Error), _describe.it.has.property('message', function (message) {
        (0, _describe.describe)(message, _describe.it.is('Foo'));
      }));
    });
  }, function () {
    return _describe.describe.batch('Promise', function () {
      return _describe.describe.batch('Describe promise resolve', (0, _describe.describe)(new Promise(function (r1) {
        return r1(1);
      }), _describe.it.is(1)));
    }, function () {
      return _describe.describe.batch('Describe promise reject', (0, _describe.describe)(new Promise(function (r1, r2) {
        return r2(new Error('Foo'));
      }), _describe.it.is.an.error));
    });
  });
};