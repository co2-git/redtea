'use strict';

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _indeed = require('../lib/indeed');

var _indeed2 = _interopRequireDefault(_indeed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(label, story) {
  try {
    var bool = story();
    if (!bool) {
      throw new Error('Assertion fails');
    }
    console.log(_safe2.default.green('  √ ' + label));
  } catch (error) {
    console.log(_safe2.default.red('  × ' + label));
    console.log(_lodash2.default.pick(error, ['subject', 'value', 'type', 'label']));
    console.log(_safe2.default.yellow(error.stack));
  }
}

console.log(_safe2.default.bold.underline.italic('indeed'));

console.log();
console.log('null');
console.log();

test('null is null', function () {
  return (0, _indeed2.default)(null).is(null);
});
test('null is not undefined', function () {
  return (0, _indeed2.default)(null).is.not(undefined);
});
test('null is not 1', function () {
  return (0, _indeed2.default)(null).is.not(1);
});
test('null is not "abc"', function () {
  return (0, _indeed2.default)(null).is.not('abc');
});
test('null is not false', function () {
  return (0, _indeed2.default)(null).is.not(false);
});
test('null is not {}', function () {
  return (0, _indeed2.default)(null).is.not({});
});
test('null is not []', function () {
  return (0, _indeed2.default)(null).is.not([]);
});
test('null is not a Number', function () {
  return (0, _indeed2.default)(null).is.not.a(Number);
});
test('null is not a String', function () {
  return (0, _indeed2.default)(null).is.not.a(String);
});
test('null is not a Boolean', function () {
  return (0, _indeed2.default)(null).is.not.a(Boolean);
});
test('null is not an Object', function () {
  return (0, _indeed2.default)(null).is.not.an(Object);
});
test('null is not an Array', function () {
  return (0, _indeed2.default)(null).is.not.an(Array);
});
test('null is not a Function', function () {
  return (0, _indeed2.default)(null).is.not.a(Function);
});
test('null is not an Error', function () {
  return (0, _indeed2.default)(null).is.not.an(Error);
});
test('null is not a Date', function () {
  return (0, _indeed2.default)(null).is.not.a(Date);
});
test('null is not a RegExp', function () {
  return (0, _indeed2.default)(null).is.not.a(RegExp);
});

console.log();
console.log('undefined');
console.log();

var undefinedVar = void 0;

test('undefined is undefined', function () {
  return (0, _indeed2.default)(undefinedVar).is(undefined);
});
test('undefined is not null', function () {
  return (0, _indeed2.default)(undefinedVar).is.not(null);
});
test('undefined is not 1', function () {
  return (0, _indeed2.default)(undefinedVar).is.not(1);
});
test('undefined is not "abc"', function () {
  return (0, _indeed2.default)(undefinedVar).is.not('abc');
});
test('undefined is not false', function () {
  return (0, _indeed2.default)(undefinedVar).is.not(false);
});
test('undefined is not {}', function () {
  return (0, _indeed2.default)(undefinedVar).is.not({});
});
test('undefined is not []', function () {
  return (0, _indeed2.default)(undefinedVar).is.not([]);
});
test('undefined is not a Number', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.a(Number);
});
test('undefined is not a String', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.a(String);
});
test('undefined is not a Boolean', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.a(Boolean);
});
test('undefined is not an Object', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.an(Object);
});
test('undefined is not an Array', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.an(Array);
});
test('undefined is not a Function', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.a(Function);
});
test('undefined is not an Error', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.an(Error);
});
test('undefined is not a Date', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.a(Date);
});
test('undefined is not a RegExp', function () {
  return (0, _indeed2.default)(undefinedVar).is.not.a(RegExp);
});

console.log();
console.log('number');
console.log();

var number = 1;

test('number is 1', function () {
  return (0, _indeed2.default)(number).is(1);
});
test('number is not null', function () {
  return (0, _indeed2.default)(number).is.not(null);
});
test('number is not undefined', function () {
  return (0, _indeed2.default)(number).is.not(undefined);
});
test('number is not 2', function () {
  return (0, _indeed2.default)(number).is.not(2);
});
test('number is not "abc"', function () {
  return (0, _indeed2.default)(number).is.not('abc');
});
test('number is not false', function () {
  return (0, _indeed2.default)(number).is.not(false);
});
test('number is not {}', function () {
  return (0, _indeed2.default)(number).is.not({});
});
test('number is not []', function () {
  return (0, _indeed2.default)(number).is.not([]);
});
test('number is a Number', function () {
  return (0, _indeed2.default)(number).is.a(Number);
});
test('number is not a String', function () {
  return (0, _indeed2.default)(number).is.not.a(String);
});
test('number is not a Boolean', function () {
  return (0, _indeed2.default)(number).is.not.a(Boolean);
});
test('number is not an Object', function () {
  return (0, _indeed2.default)(number).is.not.an(Object);
});
test('number is not an Array', function () {
  return (0, _indeed2.default)(number).is.not.an(Array);
});
test('number is not a Function', function () {
  return (0, _indeed2.default)(number).is.not.a(Function);
});
test('number is not an Error', function () {
  return (0, _indeed2.default)(number).is.not.an(Error);
});
test('number is not a Date', function () {
  return (0, _indeed2.default)(number).is.not.a(Date);
});
test('number is not a RegExp', function () {
  return (0, _indeed2.default)(number).is.not.a(RegExp);
});

console.log();
console.log('string');
console.log();

var string = 'abc';

test('string is "abc"', function () {
  return (0, _indeed2.default)(string).is("abc");
});
test('string is not null', function () {
  return (0, _indeed2.default)(string).is.not(null);
});
test('string is not undefined', function () {
  return (0, _indeed2.default)(string).is.not(undefined);
});
test('string is not 2', function () {
  return (0, _indeed2.default)(string).is.not(2);
});
test('string is not "def"', function () {
  return (0, _indeed2.default)(string).is.not('def');
});
test('string is not false', function () {
  return (0, _indeed2.default)(string).is.not(false);
});
test('string is not {}', function () {
  return (0, _indeed2.default)(string).is.not({});
});
test('string is not []', function () {
  return (0, _indeed2.default)(string).is.not([]);
});
test('string is not a Number', function () {
  return (0, _indeed2.default)(string).is.not.a(Number);
});
test('string is a String', function () {
  return (0, _indeed2.default)(string).is.a(String);
});
test('string is not a Boolean', function () {
  return (0, _indeed2.default)(string).is.not.a(Boolean);
});
test('string is not an Object', function () {
  return (0, _indeed2.default)(string).is.not.an(Object);
});
test('string is not an Array', function () {
  return (0, _indeed2.default)(string).is.not.an(Array);
});
test('string is not a Function', function () {
  return (0, _indeed2.default)(string).is.not.a(Function);
});
test('string is not an Error', function () {
  return (0, _indeed2.default)(string).is.not.an(Error);
});
test('string is not a Date', function () {
  return (0, _indeed2.default)(string).is.not.a(Date);
});
test('string is not a RegExp', function () {
  return (0, _indeed2.default)(string).is.not.a(RegExp);
});

console.log();
console.log('boolean');
console.log();

var boolean = true;

test('boolean is true', function () {
  return (0, _indeed2.default)(boolean).is(true);
});
test('boolean is not null', function () {
  return (0, _indeed2.default)(boolean).is.not(null);
});
test('boolean is not undefined', function () {
  return (0, _indeed2.default)(boolean).is.not(undefined);
});
test('boolean is not 2', function () {
  return (0, _indeed2.default)(boolean).is.not(2);
});
test('boolean is not "abc"', function () {
  return (0, _indeed2.default)(boolean).is.not('abc');
});
test('boolean is not false', function () {
  return (0, _indeed2.default)(boolean).is.not(false);
});
test('boolean is not {}', function () {
  return (0, _indeed2.default)(boolean).is.not({});
});
test('boolean is not []', function () {
  return (0, _indeed2.default)(boolean).is.not([]);
});
test('boolean is not a Number', function () {
  return (0, _indeed2.default)(boolean).is.not.a(Number);
});
test('boolean is not a String', function () {
  return (0, _indeed2.default)(boolean).is.not.a(String);
});
test('boolean is a Boolean', function () {
  return (0, _indeed2.default)(boolean).is.a(Boolean);
});
test('boolean is not an Object', function () {
  return (0, _indeed2.default)(boolean).is.not.an(Object);
});
test('boolean is not an Array', function () {
  return (0, _indeed2.default)(boolean).is.not.an(Array);
});
test('boolean is not a Function', function () {
  return (0, _indeed2.default)(boolean).is.not.a(Function);
});
test('boolean is not an Error', function () {
  return (0, _indeed2.default)(boolean).is.not.an(Error);
});
test('boolean is not a Date', function () {
  return (0, _indeed2.default)(boolean).is.not.a(Date);
});
test('boolean is not a RegExp', function () {
  return (0, _indeed2.default)(boolean).is.not.a(RegExp);
});

console.log();
console.log('object');
console.log();

var object = { foo: 1 };

test('object is {foo: 1}', function () {
  return (0, _indeed2.default)(object).is({ foo: 1 });
});
test('object is not null', function () {
  return (0, _indeed2.default)(object).is.not(null);
});
test('object is not undefined', function () {
  return (0, _indeed2.default)(object).is.not(undefined);
});
test('object is not 2', function () {
  return (0, _indeed2.default)(object).is.not(2);
});
test('object is not "abc"', function () {
  return (0, _indeed2.default)(object).is.not('abc');
});
test('object is not false', function () {
  return (0, _indeed2.default)(object).is.not(false);
});
test('object is not {foo: 2}', function () {
  return (0, _indeed2.default)(object).is.not({ foo: 2 });
});
test('object is not []', function () {
  return (0, _indeed2.default)(object).is.not([]);
});
test('object is not a Number', function () {
  return (0, _indeed2.default)(object).is.not.a(Number);
});
test('object is not a String', function () {
  return (0, _indeed2.default)(object).is.not.a(String);
});
test('object is not a Boolean', function () {
  return (0, _indeed2.default)(object).is.not.a(Boolean);
});
test('object is an Object', function () {
  return (0, _indeed2.default)(object).is.an(Object);
});
test('object is not an Array', function () {
  return (0, _indeed2.default)(object).is.not.an(Array);
});
test('object is not a Function', function () {
  return (0, _indeed2.default)(object).is.not.a(Function);
});
test('object is not an Error', function () {
  return (0, _indeed2.default)(object).is.not.an(Error);
});
test('object is not a Date', function () {
  return (0, _indeed2.default)(object).is.not.a(Date);
});
test('object is not a RegExp', function () {
  return (0, _indeed2.default)(object).is.not.a(RegExp);
});

console.log();
console.log('array');
console.log();

var array = [1];

test('array is [1]', function () {
  return (0, _indeed2.default)(array).is([1]);
});
test('array is not null', function () {
  return (0, _indeed2.default)(array).is.not(null);
});
test('array is not undefined', function () {
  return (0, _indeed2.default)(array).is.not(undefined);
});
test('array is not 2', function () {
  return (0, _indeed2.default)(array).is.not(2);
});
test('array is not "abc"', function () {
  return (0, _indeed2.default)(array).is.not('abc');
});
test('array is not false', function () {
  return (0, _indeed2.default)(array).is.not(false);
});
test('array is not {}', function () {
  return (0, _indeed2.default)(array).is.not({});
});
test('array is not []', function () {
  return (0, _indeed2.default)(array).is.not([]);
});
test('array is not a Number', function () {
  return (0, _indeed2.default)(array).is.not.a(Number);
});
test('array is not a String', function () {
  return (0, _indeed2.default)(array).is.not.a(String);
});
test('array is not a Boolean', function () {
  return (0, _indeed2.default)(array).is.not.a(Boolean);
});
test('array is not an Object', function () {
  return (0, _indeed2.default)(array).is.not.an(Object);
});
test('array is an Array', function () {
  return (0, _indeed2.default)(array).is.an(Array);
});
test('array is not a Function', function () {
  return (0, _indeed2.default)(array).is.not.a(Function);
});
test('array is not an Error', function () {
  return (0, _indeed2.default)(array).is.not.an(Error);
});
test('array is not a Date', function () {
  return (0, _indeed2.default)(array).is.not.a(Date);
});
test('array is not a RegExp', function () {
  return (0, _indeed2.default)(array).is.not.a(RegExp);
});

console.log();
console.log('function');
console.log();

function foo() {
  return 1;
}

test('foo is foo', function () {
  return (0, _indeed2.default)(foo).is(foo);
});
test('foo is not null', function () {
  return (0, _indeed2.default)(foo).is.not(null);
});
test('foo is not undefined', function () {
  return (0, _indeed2.default)(foo).is.not(undefined);
});
test('foo is not 2', function () {
  return (0, _indeed2.default)(foo).is.not(2);
});
test('foo is not "abc"', function () {
  return (0, _indeed2.default)(foo).is.not('abc');
});
test('foo is not false', function () {
  return (0, _indeed2.default)(foo).is.not(false);
});
test('foo is not {}', function () {
  return (0, _indeed2.default)(foo).is.not({});
});
test('foo is not []', function () {
  return (0, _indeed2.default)(foo).is.not([]);
});
test('foo is not a Number', function () {
  return (0, _indeed2.default)(foo).is.not.a(Number);
});
test('foo is not a String', function () {
  return (0, _indeed2.default)(foo).is.not.a(String);
});
test('foo is not a Boolean', function () {
  return (0, _indeed2.default)(foo).is.not.a(Boolean);
});
test('foo is not an Object', function () {
  return (0, _indeed2.default)(foo).is.not.an(Object);
});
test('foo is not an Array', function () {
  return (0, _indeed2.default)(foo).is.not.an(Array);
});
test('foo is a Function', function () {
  return (0, _indeed2.default)(foo).is.a(Function);
});
test('foo is not an Error', function () {
  return (0, _indeed2.default)(foo).is.not.an(Error);
});
test('foo is not a Date', function () {
  return (0, _indeed2.default)(foo).is.not.a(Date);
});
test('foo is not a RegExp', function () {
  return (0, _indeed2.default)(foo).is.not.a(RegExp);
});