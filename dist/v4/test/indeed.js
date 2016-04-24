'use strict';

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is = require('../lib/is');

var _is2 = _interopRequireDefault(_is);

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
  return (0, _is2.default)(undefinedVar, undefined);
});
test('undefined is not null', function () {
  return _is2.default.not(undefinedVar, null);
});
test('undefined is not 1', function () {
  return _is2.default.not(undefinedVar, 1);
});
test('undefined is not "abc"', function () {
  return _is2.default.not(undefinedVar, 'abc');
});
test('undefined is not false', function () {
  return _is2.default.not(undefinedVar, false);
});
test('undefined is not {}', function () {
  return _is2.default.not(undefinedVar, {});
});
test('undefined is not []', function () {
  return _is2.default.not(undefinedVar, []);
});
test('undefined is not a Number', function () {
  return _is2.default.not.type(undefinedVar, Number);
});
test('undefined is not a String', function () {
  return _is2.default.not.type(undefinedVar, String);
});
test('undefined is not a Boolean', function () {
  return _is2.default.not.type(undefinedVar, Boolean);
});
test('undefined is not an Object', function () {
  return _is2.default.not.type(undefinedVar, Object);
});
test('undefined is not an Array', function () {
  return _is2.default.not.type(undefinedVar, Array);
});
test('undefined is not a Function', function () {
  return _is2.default.not.type(undefinedVar, Function);
});
test('undefined is not an Error', function () {
  return _is2.default.not.type(undefinedVar, Error);
});
test('undefined is not a Date', function () {
  return _is2.default.not.type(undefinedVar, Date);
});
test('undefined is not a RegExp', function () {
  return _is2.default.not.type(undefinedVar, RegExp);
});

console.log();
console.log('number');
console.log();

var number = 1;

test('number is number', function () {
  return (0, _is2.default)(number, 1);
});
test('number is not null', function () {
  return _is2.default.not(number, null);
});
test('number is not 2', function () {
  return _is2.default.not(number, 2);
});
test('number is not "abc"', function () {
  return _is2.default.not(number, 'abc');
});
test('number is not false', function () {
  return _is2.default.not(number, false);
});
test('number is not {}', function () {
  return _is2.default.not(number, {});
});
test('number is not []', function () {
  return _is2.default.not(number, []);
});
test('number is a Number', function () {
  return _is2.default.type(number, Number);
});
test('number is not a String', function () {
  return _is2.default.not.type(number, String);
});
test('number is not a Boolean', function () {
  return _is2.default.not.type(number, Boolean);
});
test('number is not a Function', function () {
  return _is2.default.not.type(number, Function);
});
test('number is not an Object', function () {
  return _is2.default.not.type(number, Object);
});
test('number is not an Array', function () {
  return _is2.default.not.type(number, Array);
});
test('number is not an Error', function () {
  return _is2.default.not.type(number, Error);
});
test('number is not a Date', function () {
  return _is2.default.not.type(number, Date);
});
test('number is not a RegExp', function () {
  return _is2.default.not.type(number, RegExp);
});

console.log();
console.log('string');
console.log();

var string = 'abc';

test('string is string', function () {
  return (0, _is2.default)(string, 'abc');
});
test('string is not null', function () {
  return _is2.default.not(string, null);
});
test('string is not 1', function () {
  return _is2.default.not(string, 1);
});
test('string is not "def"', function () {
  return _is2.default.not(string, 'def');
});
test('string is not false', function () {
  return _is2.default.not(string, false);
});
test('string is not {}', function () {
  return _is2.default.not(string, {});
});
test('string is not []', function () {
  return _is2.default.not(string, []);
});
test('string is not a Number', function () {
  return _is2.default.not.type(string, Number);
});
test('string is a String', function () {
  return _is2.default.type(string, String);
});
test('string is not a Boolean', function () {
  return _is2.default.not.type(string, Boolean);
});
test('string is not a Function', function () {
  return _is2.default.not.type(string, Function);
});
test('string is not an Object', function () {
  return _is2.default.not.type(string, Object);
});
test('string is not an Array', function () {
  return _is2.default.not.type(string, Array);
});
test('string is not an Error', function () {
  return _is2.default.not.type(string, Error);
});
test('string is not a Date', function () {
  return _is2.default.not.type(string, Date);
});
test('string is not a RegExp', function () {
  return _is2.default.not.type(string, RegExp);
});

console.log();
console.log('boolean');
console.log();

var boolean = true;

test('boolean is boolean', function () {
  return (0, _is2.default)(boolean, true);
});
test('boolean is not null', function () {
  return _is2.default.not(boolean, null);
});
test('boolean is not 1', function () {
  return _is2.default.not(boolean, 1);
});
test('boolean is not "abc"', function () {
  return _is2.default.not(boolean, 'abc');
});
test('boolean is not false', function () {
  return _is2.default.not(boolean, false);
});
test('boolean is not {}', function () {
  return _is2.default.not(boolean, {});
});
test('boolean is not []', function () {
  return _is2.default.not(boolean, []);
});
test('boolean is not a Number', function () {
  return _is2.default.not.type(boolean, Number);
});
test('boolean is not a String', function () {
  return _is2.default.not.type(boolean, String);
});
test('boolean is not a Function', function () {
  return _is2.default.not.type(boolean, Function);
});
test('boolean is a Boolean', function () {
  return _is2.default.type(boolean, Boolean);
});
test('boolean is not an Object', function () {
  return _is2.default.not.type(boolean, Object);
});
test('boolean is not an Array', function () {
  return _is2.default.not.type(boolean, Array);
});
test('boolean is not an Error', function () {
  return _is2.default.not.type(boolean, Error);
});
test('boolean is not a Date', function () {
  return _is2.default.not.type(boolean, Date);
});
test('boolean is not a RegExp', function () {
  return _is2.default.not.type(boolean, RegExp);
});

console.log();
console.log('object');
console.log();

var object = { foo: 1 };

test('object is {foo: 1}', function () {
  return (0, _is2.default)(object, { foo: 1 });
});
test('object is not null', function () {
  return _is2.default.not(object, null);
});
test('object is not 1', function () {
  return _is2.default.not(object, 1);
});
test('object is not "abc"', function () {
  return _is2.default.not(object, 'abc');
});
test('object is not false', function () {
  return _is2.default.not(object, false);
});
test('object is not {foo: 2}', function () {
  return _is2.default.not(object, { foo: 2 });
});
test('object is not []', function () {
  return _is2.default.not(object, []);
});
test('object is not a Number', function () {
  return _is2.default.not.type(object, Number);
});
test('object is not a String', function () {
  return _is2.default.not.type(object, String);
});
test('object is not a Boolean', function () {
  return _is2.default.not.type(object, Boolean);
});
test('object is not a Function', function () {
  return _is2.default.not.type(object, Function);
});
test('object is an Object', function () {
  return _is2.default.type(object, Object);
});
test('object is not an Array', function () {
  return _is2.default.not.type(object, Array);
});
test('object is not an Error', function () {
  return _is2.default.not.type(object, Error);
});
test('object is not a Date', function () {
  return _is2.default.not.type(object, Date);
});
test('object is not a RegExp', function () {
  return _is2.default.not.type(object, RegExp);
});

console.log();
console.log('array');
console.log();

var array = [1];

test('array is [1]', function () {
  return (0, _is2.default)(array, [1]);
});
test('array is not null', function () {
  return _is2.default.not(array, null);
});
test('array is not 1', function () {
  return _is2.default.not(array, 1);
});
test('array is not "abc"', function () {
  return _is2.default.not(array, 'abc');
});
test('array is not false', function () {
  return _is2.default.not(array, false);
});
test('array is not {foo: 2}', function () {
  return _is2.default.not(array, { foo: 2 });
});
test('array is not [2]', function () {
  return _is2.default.not(array, [2]);
});
test('array is not a Number', function () {
  return _is2.default.not.type(array, Number);
});
test('array is not a String', function () {
  return _is2.default.not.type(array, String);
});
test('array is not a Boolean', function () {
  return _is2.default.not.type(array, Boolean);
});
test('array is not a Function', function () {
  return _is2.default.not.type(array, Function);
});
test('array is not an Object', function () {
  return _is2.default.not.type(array, Object);
});
test('array is an Array', function () {
  return _is2.default.type(array, Array);
});
test('array is not an Error', function () {
  return _is2.default.not.type(array, Error);
});
test('array is not a Date', function () {
  return _is2.default.not.type(array, Date);
});
test('array is not a RegExp', function () {
  return _is2.default.not.type(array, RegExp);
});

console.log();
console.log('function');
console.log();

function foo() {
  return 1;
}

test('function is function', function () {
  return (0, _is2.default)(foo, foo);
});
test('function is not null', function () {
  return _is2.default.not(foo, null);
});
test('function is not 1', function () {
  return _is2.default.not(foo, 1);
});
test('function is not "abc"', function () {
  return _is2.default.not(foo, 'abc');
});
test('function is not false', function () {
  return _is2.default.not(foo, false);
});
test('function is not {foo: 2}', function () {
  return _is2.default.not(foo, { foo: 2 });
});
test('function is not [2]', function () {
  return _is2.default.not(foo, [2]);
});
test('function is not a Number', function () {
  return _is2.default.not.type(foo, Number);
});
test('function is not a String', function () {
  return _is2.default.not.type(foo, String);
});
test('function is not a Boolean', function () {
  return _is2.default.not.type(foo, Boolean);
});
test('function is a Function', function () {
  return _is2.default.type(foo, Function);
});
test('function is not an Object', function () {
  return _is2.default.not.type(foo, Object);
});
test('function is not an Array', function () {
  return _is2.default.not.type(foo, Array);
});
test('function is not an Error', function () {
  return _is2.default.not.type(foo, Error);
});
test('function is not a Date', function () {
  return _is2.default.not.type(foo, Date);
});
test('function is not a RegExp', function () {
  return _is2.default.not.type(foo, RegExp);
});