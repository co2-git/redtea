'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _describe = require('../lib/describe');

var undefinedVar = void 0;
var stringVar = 'a';
var numVar = 1;
var boolVar = true;
var objVar = { foo: 1 };
var arrVar = [1];
var dateVar = new Date();
var error = new Error('Oops');
var regex = /.+/;

exports.default = function () {
  return _describe.describe.batch('Is', function () {
    return (0, _describe.describe)(null, _describe.it.is.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.not.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(undefinedVar, _describe.it.is.not.null, _describe.it.is.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.not.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(stringVar, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.not.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(numVar, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.not.a.string, _describe.it.is.a.number, _describe.it.is.not.a.boolean, _describe.it.is.not.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(boolVar, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.a.boolean, _describe.it.is.not.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(objVar, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is({ foo: 1 }), _describe.it.is.not({ foo: 2 }), _describe.it.is.not({ foo: 1, vv: 2 }), _describe.it.is.not([]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(arrVar, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is([1]), _describe.it.is.not([true]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.not.an.object, _describe.it.is.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(dateVar, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.not([true]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(error, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.not([true]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.an.error, _describe.it.is.not.a.date, _describe.it.is.not.a.regular.expression);
  }, function () {
    return (0, _describe.describe)(regex, _describe.it.is.not.null, _describe.it.is.not.undefined, _describe.it.is.not(0), _describe.it.is.not(1), _describe.it.is.not(''), _describe.it.is.not('a'), _describe.it.is.not('b'), _describe.it.is.not.true, _describe.it.is.not.false, _describe.it.is.not({}), _describe.it.is.not([]), _describe.it.is.not([true]), _describe.it.is.not.a.string, _describe.it.is.not.a.number, _describe.it.is.not.a.boolean, _describe.it.is.an.object, _describe.it.is.not.an.array, _describe.it.is.not.a.function, _describe.it.is.not.an.error, _describe.it.is.not.a.date, _describe.it.is.a.regular.expression);
  });
};