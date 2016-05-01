'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _describe = require('../lib/describe');

var _indeed = require('../lib/indeed');

var _indeed2 = _interopRequireDefault(_indeed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _describe.describe.batch('Indeed', function () {
    return _describe.describe.batch('null', function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.null, { as: 'null is null' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not.null, { as: 'null is not null' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.undefined, { as: 'null is undefined' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not.undefined, { as: 'null is not undefined' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.true, { as: 'null is true' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not.true, { as: 'null is not true' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.false, { as: 'null is false' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not.false, { as: 'null is not false' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is(0), { as: 'null is number 0' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not(0), { as: 'null is not number 0' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is(1), { as: 'null is number 1' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not(1), { as: 'null is not number 1' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is(''), { as: 'null is string ""' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not(''), { as: 'null is not string ""' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is('a'), { as: 'null is string "a"' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not('a'), { as: 'null is not string "a"' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is('A'), { as: 'null is string "A"' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not('A'), { as: 'null is not string "A"' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is({}), { as: 'null is object {}' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not({}), { as: 'null is not object {}' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is({ foo: 1 }), { as: 'null is object {foo: 1}' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not({ foo: 1 }), { as: 'null is not object {foo: 1}' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is({ foo: 2 }), { as: 'null is object {foo: 2}' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not({ foo: 2 }), { as: 'null is not object {foo: 2}' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is({ foo: 1, bar: { barz: 0 } }), { as: 'null is object {foo: 1, bar: {barz: 0}}' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not({ foo: 1, bar: { barz: 0 } }), { as: 'null is not object {foo: 1, bar: {barz: 0}}' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is([]), { as: 'null is array []' }, _describe.it.is.false);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not([]), { as: 'null is not array []' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.not.a.string, { as: 'null is not a string' }, _describe.it.is.true);
    }, function () {
      return (0, _describe.describe)((0, _indeed2.default)(null).is.a.string, { as: 'null is a string' }, _describe.it.is.false);
    });
  });
};