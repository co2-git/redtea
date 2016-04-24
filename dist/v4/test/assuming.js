'use strict';

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _assuming = require('../lib/assuming');

var _assuming2 = _interopRequireDefault(_assuming);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(label, story) {
  try {
    story();
    console.log(_safe2.default.green('  √ ' + label));
  } catch (error) {
    console.log(_safe2.default.red('  × ' + label));
    console.log(_lodash2.default.pick(error, ['subject', 'value', 'type', 'label']));
    console.log(_safe2.default.yellow(error.stack));
  }
}

console.log(_safe2.default.bold.underline.italic('assuming'));

console.log();
console.log('null');
console.log();

test('null is null', function () {
  return (0, _assuming2.default)(null).is(null);
});
test('null is not undefined', function () {
  return (0, _assuming2.default)(null).is.not(undefined);
});
test('null is not 1', function () {
  return (0, _assuming2.default)(null).is.not(1);
});
test('null is not "abc"', function () {
  return (0, _assuming2.default)(null).is.not('abc');
});
test('null is not false', function () {
  return (0, _assuming2.default)(null).is.not(false);
});
test('null is not {}', function () {
  return (0, _assuming2.default)(null).is.not({});
});
test('null is not []', function () {
  return (0, _assuming2.default)(null).is.not([]);
});
test('null is not a Number', function () {
  return (0, _assuming2.default)(null).is.not.a(Number);
});
test('null is not a String', function () {
  return (0, _assuming2.default)(null).is.not.a(String);
});
test('null is not a Boolean', function () {
  return (0, _assuming2.default)(null).is.not.a(Boolean);
});
test('null is not an Object', function () {
  return (0, _assuming2.default)(null).is.not.a(Object);
});
test('null is not an Array', function () {
  return (0, _assuming2.default)(null).is.not.a(Array);
});
test('null is not a Function', function () {
  return (0, _assuming2.default)(null).is.not.a(Function);
});
test('null is not an Error', function () {
  return (0, _assuming2.default)(null).is.not.a(Error);
});
test('null is not a Date', function () {
  return (0, _assuming2.default)(null).is.not.a(Date);
});
test('null is not a RegExp', function () {
  return (0, _assuming2.default)(null).is.not.a(RegExp);
});

console.log();
console.log('undefined');
console.log();

var undefinedVar = void 0;

test('undefined is undefined', function () {
  return (0, _assuming2.default)(undefinedVar).is(undefined);
});
test('undefined is not null', function () {
  return (0, _assuming2.default)(undefinedVar).is.not(null);
});
test('undefined is not 1', function () {
  return (0, _assuming2.default)(undefinedVar).is.not(1);
});
test('undefined is not "abc"', function () {
  return (0, _assuming2.default)(undefinedVar).is.not('abc');
});
test('undefined is not false', function () {
  return (0, _assuming2.default)(undefinedVar).is.not(false);
});
test('undefined is not {}', function () {
  return (0, _assuming2.default)(undefinedVar).is.not({});
});
test('undefined is not []', function () {
  return (0, _assuming2.default)(undefinedVar).is.not([]);
});
test('undefined is not a Number', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(Number);
});
test('undefined is not a String', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(String);
});
test('undefined is not a Boolean', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(Boolean);
});
test('undefined is not an Object', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(Object);
});
test('undefined is not an Array', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(Array);
});
test('undefined is not a Function', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(Function);
});
test('undefined is not an Error', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(Error);
});
test('undefined is not a Date', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(Date);
});
test('undefined is not a RegExp', function () {
  return (0, _assuming2.default)(undefinedVar).is.not.a(RegExp);
});

console.log();
console.log('number');
console.log();

var number = 1;

test('number is number', function () {
  return (0, _assuming2.default)(number).is(1);
});
test('number is not null', function () {
  return (0, _assuming2.default)(number).is.not(null);
});
test('number is not 2', function () {
  return (0, _assuming2.default)(number).is.not(2);
});
test('number is not "abc"', function () {
  return (0, _assuming2.default)(number).is.not('abc');
});
test('number is not false', function () {
  return (0, _assuming2.default)(number).is.not(false);
});
test('number is not {}', function () {
  return (0, _assuming2.default)(number).is.not({});
});
test('number is not []', function () {
  return (0, _assuming2.default)(number).is.not([]);
});
test('number is a Number', function () {
  return (0, _assuming2.default)(number).is.a(Number);
});
test('number is not a String', function () {
  return (0, _assuming2.default)(number).is.not.a(String);
});
test('number is not a Boolean', function () {
  return (0, _assuming2.default)(number).is.not.a(Boolean);
});
test('number is not a Function', function () {
  return (0, _assuming2.default)(number).is.not.a(Function);
});
test('number is not an Object', function () {
  return (0, _assuming2.default)(number).is.not.a(Object);
});
test('number is not an Array', function () {
  return (0, _assuming2.default)(number).is.not.a(Array);
});
test('number is not an Error', function () {
  return (0, _assuming2.default)(number).is.not.a(Error);
});
test('number is not a Date', function () {
  return (0, _assuming2.default)(number).is.not.a(Date);
});
test('number is not a RegExp', function () {
  return (0, _assuming2.default)(number).is.not.a(RegExp);
});

console.log();
console.log('string');
console.log();

var string = 'abc';

test('string is string', function () {
  return (0, _assuming2.default)(string).is('abc');
});
test('string is not null', function () {
  return (0, _assuming2.default)(string).is.not(null);
});
test('string is not 1', function () {
  return (0, _assuming2.default)(string).is.not(1);
});
test('string is not "def"', function () {
  return (0, _assuming2.default)(string).is.not('def');
});
test('string is not false', function () {
  return (0, _assuming2.default)(string).is.not(false);
});
test('string is not {}', function () {
  return (0, _assuming2.default)(string).is.not({});
});
test('string is not []', function () {
  return (0, _assuming2.default)(string).is.not([]);
});
test('string is not a Number', function () {
  return (0, _assuming2.default)(string).is.not.a(Number);
});
test('string is a String', function () {
  return (0, _assuming2.default)(string).is.a(String);
});
test('string is not a Boolean', function () {
  return (0, _assuming2.default)(string).is.not.a(Boolean);
});
test('string is not a Function', function () {
  return (0, _assuming2.default)(string).is.not.a(Function);
});
test('string is not an Object', function () {
  return (0, _assuming2.default)(string).is.not.a(Object);
});
test('string is not an Array', function () {
  return (0, _assuming2.default)(string).is.not.a(Array);
});
test('string is not an Error', function () {
  return (0, _assuming2.default)(string).is.not.a(Error);
});
test('string is not a Date', function () {
  return (0, _assuming2.default)(string).is.not.a(Date);
});
test('string is not a RegExp', function () {
  return (0, _assuming2.default)(string).is.not.a(RegExp);
});

console.log();
console.log('boolean');
console.log();

var boolean = true;

test('boolean is boolean', function () {
  return (0, _assuming2.default)(boolean).is(true);
});
test('boolean is not null', function () {
  return (0, _assuming2.default)(boolean).is.not(null);
});
test('boolean is not 1', function () {
  return (0, _assuming2.default)(boolean).is.not(1);
});
test('boolean is not "abc"', function () {
  return (0, _assuming2.default)(boolean).is.not('abc');
});
test('boolean is not false', function () {
  return (0, _assuming2.default)(boolean).is.not(false);
});
test('boolean is not {}', function () {
  return (0, _assuming2.default)(boolean).is.not({});
});
test('boolean is not []', function () {
  return (0, _assuming2.default)(boolean).is.not([]);
});
test('boolean is not a Number', function () {
  return (0, _assuming2.default)(boolean).is.not.a(Number);
});
test('boolean is not a String', function () {
  return (0, _assuming2.default)(boolean).is.not.a(String);
});
test('boolean is not a Function', function () {
  return (0, _assuming2.default)(boolean).is.not.a(Function);
});
test('boolean is a Boolean', function () {
  return (0, _assuming2.default)(boolean).is.a(Boolean);
});
test('boolean is not an Object', function () {
  return (0, _assuming2.default)(boolean).is.not.a(Object);
});
test('boolean is not an Array', function () {
  return (0, _assuming2.default)(boolean).is.not.a(Array);
});
test('boolean is not an Error', function () {
  return (0, _assuming2.default)(boolean).is.not.a(Error);
});
test('boolean is not a Date', function () {
  return (0, _assuming2.default)(boolean).is.not.a(Date);
});
test('boolean is not a RegExp', function () {
  return (0, _assuming2.default)(boolean).is.not.a(RegExp);
});

console.log();
console.log('object');
console.log();

var object = { foo: 1 };

test('object is {foo: 1}', function () {
  return (0, _assuming2.default)(object).is({ foo: 1 });
});
test('object is not null', function () {
  return (0, _assuming2.default)(object).is.not(null);
});
test('object is not 1', function () {
  return (0, _assuming2.default)(object).is.not(1);
});
test('object is not "abc"', function () {
  return (0, _assuming2.default)(object).is.not('abc');
});
test('object is not false', function () {
  return (0, _assuming2.default)(object).is.not(false);
});
test('object is not {foo: 2}', function () {
  return (0, _assuming2.default)(object).is.not({ foo: 2 });
});
test('object is not []', function () {
  return (0, _assuming2.default)(object).is.not([]);
});
test('object is not a Number', function () {
  return (0, _assuming2.default)(object).is.not.a(Number);
});
test('object is not a String', function () {
  return (0, _assuming2.default)(object).is.not.a(String);
});
test('object is not a Boolean', function () {
  return (0, _assuming2.default)(object).is.not.a(Boolean);
});
test('object is not a Function', function () {
  return (0, _assuming2.default)(object).is.not.a(Function);
});
test('object is an Object', function () {
  return (0, _assuming2.default)(object).is.an(Object);
});
test('object is not an Array', function () {
  return (0, _assuming2.default)(object).is.not.a(Array);
});
test('object is not an Error', function () {
  return (0, _assuming2.default)(object).is.not.a(Error);
});
test('object is not a Date', function () {
  return (0, _assuming2.default)(object).is.not.a(Date);
});
test('object is not a RegExp', function () {
  return (0, _assuming2.default)(object).is.not.a(RegExp);
});

console.log();
console.log('array');
console.log();

var array = [1];

test('array is [1]', function () {
  return (0, _assuming2.default)(array).is([1]);
});
test('array is not null', function () {
  return (0, _assuming2.default)(array).is.not(null);
});
test('array is not 1', function () {
  return (0, _assuming2.default)(array).is.not(1);
});
test('array is not "abc"', function () {
  return (0, _assuming2.default)(array).is.not('abc');
});
test('array is not false', function () {
  return (0, _assuming2.default)(array).is.not(false);
});
test('array is not {foo: 2}', function () {
  return (0, _assuming2.default)(array).is.not({ foo: 2 });
});
test('array is not [2]', function () {
  return (0, _assuming2.default)(array).is.not([2]);
});
test('array is not a Number', function () {
  return (0, _assuming2.default)(array).is.not.a(Number);
});
test('array is not a String', function () {
  return (0, _assuming2.default)(array).is.not.a(String);
});
test('array is not a Boolean', function () {
  return (0, _assuming2.default)(array).is.not.a(Boolean);
});
test('array is not a Function', function () {
  return (0, _assuming2.default)(array).is.not.a(Function);
});
test('array is not an Object', function () {
  return (0, _assuming2.default)(array).is.not.a(Object);
});
test('array is an Array', function () {
  return (0, _assuming2.default)(array).is.an(Array);
});
test('array is not an Error', function () {
  return (0, _assuming2.default)(array).is.not.a(Error);
});
test('array is not a Date', function () {
  return (0, _assuming2.default)(array).is.not.a(Date);
});
test('array is not a RegExp', function () {
  return (0, _assuming2.default)(array).is.not.a(RegExp);
});

console.log();
console.log('function');
console.log();

function foo() {
  return 1;
}

test('function is function', function () {
  return (0, _assuming2.default)(foo).is(foo);
});
test('function is not null', function () {
  return (0, _assuming2.default)(foo).is.not(null);
});
test('function is not 1', function () {
  return (0, _assuming2.default)(foo).is.not(1);
});
test('function is not "abc"', function () {
  return (0, _assuming2.default)(foo).is.not('abc');
});
test('function is not false', function () {
  return (0, _assuming2.default)(foo).is.not(false);
});
test('function is not {foo: 2}', function () {
  return (0, _assuming2.default)(foo).is.not({ foo: 2 });
});
test('function is not [2]', function () {
  return (0, _assuming2.default)(foo).is.not([2]);
});
test('function is not a Number', function () {
  return (0, _assuming2.default)(foo).is.not.a(Number);
});
test('function is not a String', function () {
  return (0, _assuming2.default)(foo).is.not.a(String);
});
test('function is not a Boolean', function () {
  return (0, _assuming2.default)(foo).is.not.a(Boolean);
});
test('function is a Function', function () {
  return (0, _assuming2.default)(foo).is.a(Function);
});
test('function is not an Object', function () {
  return (0, _assuming2.default)(foo).is.not.a(Object);
});
test('function is not an Array', function () {
  return (0, _assuming2.default)(foo).is.not.a(Array);
});
test('function is not an Error', function () {
  return (0, _assuming2.default)(foo).is.not.a(Error);
});
test('function is not a Date', function () {
  return (0, _assuming2.default)(foo).is.not.a(Date);
});
test('function is not a RegExp', function () {
  return (0, _assuming2.default)(foo).is.not.a(RegExp);
});