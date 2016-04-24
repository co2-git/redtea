// @flow
import colors from 'colors/safe';
import _ from 'lodash';
import is from '../lib/is';

function test(label: string, story: Function): void {
  try {
    story();
    console.log(colors.green(`  √ ${label}`));
  } catch (error) {
    console.log(colors.red(`  × ${label}`));
    console.log(_.pick(error, ['subject', 'value', 'type', 'label']));
    console.log(colors.yellow(error.stack));
  }
}

console.log(colors.bold.underline.italic('is'));

console.log();
console.log('null');
console.log();

test('null is null', () => is(null, null));
test('null is not undefined', () => is.not(null, undefined));
test('null is not 1', () => is.not(null, 1));
test('null is not "abc"', () => is.not(null, 'abc'));
test('null is not false', () => is.not(null, false));
test('null is not {}', () => is.not(null, {}));
test('null is not []', () => is.not(null, []));
test('null is not a Number', () => is.not.type(null, Number));
test('null is not a String', () => is.not.type(null, String));
test('null is not a Boolean', () => is.not.type(null, Boolean));
test('null is not an Object', () => is.not.type(null, Object));
test('null is not an Array', () => is.not.type(null, Array));
test('null is not a Function', () => is.not.type(null, Function));
test('null is not an Error', () => is.not.type(null, Error));
test('null is not a Date', () => is.not.type(null, Date));
test('null is not a RegExp', () => is.not.type(null, RegExp));

console.log();
console.log('undefined');
console.log();

let undefinedVar;

test('undefined is undefined', () => is(undefinedVar, undefined));
test('undefined is not null', () => is.not(undefinedVar, null));
test('undefined is not 1', () => is.not(undefinedVar, 1));
test('undefined is not "abc"', () => is.not(undefinedVar, 'abc'));
test('undefined is not false', () => is.not(undefinedVar, false));
test('undefined is not {}', () => is.not(undefinedVar, {}));
test('undefined is not []', () => is.not(undefinedVar, []));
test('undefined is not a Number', () => is.not.type(undefinedVar, Number));
test('undefined is not a String', () => is.not.type(undefinedVar, String));
test('undefined is not a Boolean', () => is.not.type(undefinedVar, Boolean));
test('undefined is not an Object', () => is.not.type(undefinedVar, Object));
test('undefined is not an Array', () => is.not.type(undefinedVar, Array));
test('undefined is not a Function', () => is.not.type(undefinedVar, Function));
test('undefined is not an Error', () => is.not.type(undefinedVar, Error));
test('undefined is not a Date', () => is.not.type(undefinedVar, Date));
test('undefined is not a RegExp', () => is.not.type(undefinedVar, RegExp));

console.log();
console.log('number');
console.log();

const number = 1;

test('number is number', () => is(number, 1));
test('number is not null', () => is.not(number, null));
test('number is not 2', () => is.not(number, 2));
test('number is not "abc"', () => is.not(number, 'abc'));
test('number is not false', () => is.not(number, false));
test('number is not {}', () => is.not(number, {}));
test('number is not []', () => is.not(number, []));
test('number is a Number', () => is.type(number, Number));
test('number is not a String', () => is.not.type(number, String));
test('number is not a Boolean', () => is.not.type(number, Boolean));
test('number is not a Function', () => is.not.type(number, Function));
test('number is not an Object', () => is.not.type(number, Object));
test('number is not an Array', () => is.not.type(number, Array));
test('number is not an Error', () => is.not.type(number, Error));
test('number is not a Date', () => is.not.type(number, Date));
test('number is not a RegExp', () => is.not.type(number, RegExp));

console.log();
console.log('string');
console.log();

const string = 'abc';

test('string is string', () => is(string, 'abc'));
test('string is not null', () => is.not(string, null));
test('string is not 1', () => is.not(string, 1));
test('string is not "def"', () => is.not(string, 'def'));
test('string is not false', () => is.not(string, false));
test('string is not {}', () => is.not(string, {}));
test('string is not []', () => is.not(string, []));
test('string is not a Number', () => is.not.type(string, Number));
test('string is a String', () => is.type(string, String));
test('string is not a Boolean', () => is.not.type(string, Boolean));
test('string is not a Function', () => is.not.type(string, Function));
test('string is not an Object', () => is.not.type(string, Object));
test('string is not an Array', () => is.not.type(string, Array));
test('string is not an Error', () => is.not.type(string, Error));
test('string is not a Date', () => is.not.type(string, Date));
test('string is not a RegExp', () => is.not.type(string, RegExp));

console.log();
console.log('boolean');
console.log();

const boolean = true;

test('boolean is boolean', () => is(boolean, true));
test('boolean is not null', () => is.not(boolean, null));
test('boolean is not 1', () => is.not(boolean, 1));
test('boolean is not "abc"', () => is.not(boolean, 'abc'));
test('boolean is not false', () => is.not(boolean, false));
test('boolean is not {}', () => is.not(boolean, {}));
test('boolean is not []', () => is.not(boolean, []));
test('boolean is not a Number', () => is.not.type(boolean, Number));
test('boolean is not a String', () => is.not.type(boolean, String));
test('boolean is not a Function', () => is.not.type(boolean, Function));
test('boolean is a Boolean', () => is.type(boolean, Boolean));
test('boolean is not an Object', () => is.not.type(boolean, Object));
test('boolean is not an Array', () => is.not.type(boolean, Array));
test('boolean is not an Error', () => is.not.type(boolean, Error));
test('boolean is not a Date', () => is.not.type(boolean, Date));
test('boolean is not a RegExp', () => is.not.type(boolean, RegExp));

console.log();
console.log('object');
console.log();

const object = {foo: 1};

test('object is {foo: 1}', () => is(object, {foo: 1}));
test('object is not null', () => is.not(object, null));
test('object is not 1', () => is.not(object, 1));
test('object is not "abc"', () => is.not(object, 'abc'));
test('object is not false', () => is.not(object, false));
test('object is not {foo: 2}', () => is.not(object, {foo: 2}));
test('object is not []', () => is.not(object, []));
test('object is not a Number', () => is.not.type(object, Number));
test('object is not a String', () => is.not.type(object, String));
test('object is not a Boolean', () => is.not.type(object, Boolean));
test('object is not a Function', () => is.not.type(object, Function));
test('object is an Object', () => is.type(object, Object));
test('object is not an Array', () => is.not.type(object, Array));
test('object is not an Error', () => is.not.type(object, Error));
test('object is not a Date', () => is.not.type(object, Date));
test('object is not a RegExp', () => is.not.type(object, RegExp));

console.log();
console.log('array');
console.log();

const array = [1];

test('array is [1]', () => is(array, [1]));
test('array is not null', () => is.not(array, null));
test('array is not 1', () => is.not(array, 1));
test('array is not "abc"', () => is.not(array, 'abc'));
test('array is not false', () => is.not(array, false));
test('array is not {foo: 2}', () => is.not(array, {foo: 2}));
test('array is not [2]', () => is.not(array, [2]));
test('array is not a Number', () => is.not.type(array, Number));
test('array is not a String', () => is.not.type(array, String));
test('array is not a Boolean', () => is.not.type(array, Boolean));
test('array is not a Function', () => is.not.type(array, Function));
test('array is not an Object', () => is.not.type(array, Object));
test('array is an Array', () => is.type(array, Array));
test('array is not an Error', () => is.not.type(array, Error));
test('array is not a Date', () => is.not.type(array, Date));
test('array is not a RegExp', () => is.not.type(array, RegExp));

console.log();
console.log('function');
console.log();

function foo() {
  return 1;
}

test('function is function', () => is(foo, foo));
test('function is not null', () => is.not(foo, null));
test('function is not 1', () => is.not(foo, 1));
test('function is not "abc"', () => is.not(foo, 'abc'));
test('function is not false', () => is.not(foo, false));
test('function is not {foo: 2}', () => is.not(foo, {foo: 2}));
test('function is not [2]', () => is.not(foo, [2]));
test('function is not a Number', () => is.not.type(foo, Number));
test('function is not a String', () => is.not.type(foo, String));
test('function is not a Boolean', () => is.not.type(foo, Boolean));
test('function is a Function', () => is.type(foo, Function));
test('function is not an Object', () => is.not.type(foo, Object));
test('function is not an Array', () => is.not.type(foo, Array));
test('function is not an Error', () => is.not.type(foo, Error));
test('function is not a Date', () => is.not.type(foo, Date));
test('function is not a RegExp', () => is.not.type(foo, RegExp));
