// @flow
import colors from 'colors/safe';
import _ from 'lodash';
import assuming from '../lib/assuming';

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

console.log(colors.bold.underline.italic('assuming'));

console.log();
console.log('null');
console.log();

test('null is null', () => assuming(null).is(null));
test('null is not undefined', () => assuming(null).is.not(undefined));
test('null is not 1', () => assuming(null).is.not(1));
test('null is not "abc"', () => assuming(null).is.not('abc'));
test('null is not false', () => assuming(null).is.not(false));
test('null is not {}', () => assuming(null).is.not({}));
test('null is not []', () => assuming(null).is.not([]));
test('null is not a Number', () => assuming(null).is.not.a(Number));
test('null is not a String', () => assuming(null).is.not.a(String));
test('null is not a Boolean', () => assuming(null).is.not.a(Boolean));
test('null is not an Object', () => assuming(null).is.not.a(Object));
test('null is not an Array', () => assuming(null).is.not.a(Array));
test('null is not a Function', () => assuming(null).is.not.a(Function));
test('null is not an Error', () => assuming(null).is.not.a(Error));
test('null is not a Date', () => assuming(null).is.not.a(Date));
test('null is not a RegExp', () => assuming(null).is.not.a(RegExp));

console.log();
console.log('undefined');
console.log();

let undefinedVar;

test('undefined is undefined', () => assuming(undefinedVar).is(undefined));
test('undefined is not null', () => assuming(undefinedVar).is.not(null));
test('undefined is not 1', () => assuming(undefinedVar).is.not(1));
test('undefined is not "abc"', () => assuming(undefinedVar).is.not('abc'));
test('undefined is not false', () => assuming(undefinedVar).is.not(false));
test('undefined is not {}', () => assuming(undefinedVar).is.not({}));
test('undefined is not []', () => assuming(undefinedVar).is.not([]));
test('undefined is not a Number', () => assuming(undefinedVar).is.not.a(Number));
test('undefined is not a String', () => assuming(undefinedVar).is.not.a(String));
test('undefined is not a Boolean', () => assuming(undefinedVar).is.not.a(Boolean));
test('undefined is not an Object', () => assuming(undefinedVar).is.not.a(Object));
test('undefined is not an Array', () => assuming(undefinedVar).is.not.a(Array));
test('undefined is not a Function', () => assuming(undefinedVar).is.not.a(Function));
test('undefined is not an Error', () => assuming(undefinedVar).is.not.a(Error));
test('undefined is not a Date', () => assuming(undefinedVar).is.not.a(Date));
test('undefined is not a RegExp', () => assuming(undefinedVar).is.not.a(RegExp));

console.log();
console.log('number');
console.log();

const number = 1;

test('number is number', () => assuming(number).is(1));
test('number is not null', () => assuming(number).is.not(null));
test('number is not 2', () => assuming(number).is.not(2));
test('number is not "abc"', () => assuming(number).is.not('abc'));
test('number is not false', () => assuming(number).is.not(false));
test('number is not {}', () => assuming(number).is.not({}));
test('number is not []', () => assuming(number).is.not([]));
test('number is a Number', () => assuming(number).is.a(Number));
test('number is not a String', () => assuming(number).is.not.a(String));
test('number is not a Boolean', () => assuming(number).is.not.a(Boolean));
test('number is not a Function', () => assuming(number).is.not.a(Function));
test('number is not an Object', () => assuming(number).is.not.a(Object));
test('number is not an Array', () => assuming(number).is.not.a(Array));
test('number is not an Error', () => assuming(number).is.not.a(Error));
test('number is not a Date', () => assuming(number).is.not.a(Date));
test('number is not a RegExp', () => assuming(number).is.not.a(RegExp));

console.log();
console.log('string');
console.log();

const string = 'abc';

test('string is string', () => assuming(string).is('abc'));
test('string is not null', () => assuming(string).is.not(null));
test('string is not 1', () => assuming(string).is.not(1));
test('string is not "def"', () => assuming(string).is.not('def'));
test('string is not false', () => assuming(string).is.not(false));
test('string is not {}', () => assuming(string).is.not({}));
test('string is not []', () => assuming(string).is.not([]));
test('string is not a Number', () => assuming(string).is.not.a(Number));
test('string is a String', () => assuming(string).is.a(String));
test('string is not a Boolean', () => assuming(string).is.not.a(Boolean));
test('string is not a Function', () => assuming(string).is.not.a(Function));
test('string is not an Object', () => assuming(string).is.not.a(Object));
test('string is not an Array', () => assuming(string).is.not.a(Array));
test('string is not an Error', () => assuming(string).is.not.a(Error));
test('string is not a Date', () => assuming(string).is.not.a(Date));
test('string is not a RegExp', () => assuming(string).is.not.a(RegExp));

console.log();
console.log('boolean');
console.log();

const boolean = true;

test('boolean is boolean', () => assuming(boolean).is(true));
test('boolean is not null', () => assuming(boolean).is.not(null));
test('boolean is not 1', () => assuming(boolean).is.not(1));
test('boolean is not "abc"', () => assuming(boolean).is.not('abc'));
test('boolean is not false', () => assuming(boolean).is.not(false));
test('boolean is not {}', () => assuming(boolean).is.not({}));
test('boolean is not []', () => assuming(boolean).is.not([]));
test('boolean is not a Number', () => assuming(boolean).is.not.a(Number));
test('boolean is not a String', () => assuming(boolean).is.not.a(String));
test('boolean is not a Function', () => assuming(boolean).is.not.a(Function));
test('boolean is a Boolean', () => assuming(boolean).is.a(Boolean));
test('boolean is not an Object', () => assuming(boolean).is.not.a(Object));
test('boolean is not an Array', () => assuming(boolean).is.not.a(Array));
test('boolean is not an Error', () => assuming(boolean).is.not.a(Error));
test('boolean is not a Date', () => assuming(boolean).is.not.a(Date));
test('boolean is not a RegExp', () => assuming(boolean).is.not.a(RegExp));

console.log();
console.log('object');
console.log();

const object = {foo: 1};

test('object is {foo: 1}', () => assuming(object).is({foo: 1}));
test('object is not null', () => assuming(object).is.not(null));
test('object is not 1', () => assuming(object).is.not(1));
test('object is not "abc"', () => assuming(object).is.not('abc'));
test('object is not false', () => assuming(object).is.not(false));
test('object is not {foo: 2}', () => assuming(object).is.not({foo: 2}));
test('object is not []', () => assuming(object).is.not([]));
test('object is not a Number', () => assuming(object).is.not.a(Number));
test('object is not a String', () => assuming(object).is.not.a(String));
test('object is not a Boolean', () => assuming(object).is.not.a(Boolean));
test('object is not a Function', () => assuming(object).is.not.a(Function));
test('object is an Object', () => assuming(object).is.an(Object));
test('object is not an Array', () => assuming(object).is.not.a(Array));
test('object is not an Error', () => assuming(object).is.not.a(Error));
test('object is not a Date', () => assuming(object).is.not.a(Date));
test('object is not a RegExp', () => assuming(object).is.not.a(RegExp));

console.log();
console.log('array');
console.log();

const array = [1];

test('array is [1]', () => assuming(array).is([1]));
test('array is not null', () => assuming(array).is.not(null));
test('array is not 1', () => assuming(array).is.not(1));
test('array is not "abc"', () => assuming(array).is.not('abc'));
test('array is not false', () => assuming(array).is.not(false));
test('array is not {foo: 2}', () => assuming(array).is.not({foo: 2}));
test('array is not [2]', () => assuming(array).is.not([2]));
test('array is not a Number', () => assuming(array).is.not.a(Number));
test('array is not a String', () => assuming(array).is.not.a(String));
test('array is not a Boolean', () => assuming(array).is.not.a(Boolean));
test('array is not a Function', () => assuming(array).is.not.a(Function));
test('array is not an Object', () => assuming(array).is.not.a(Object));
test('array is an Array', () => assuming(array).is.an(Array));
test('array is not an Error', () => assuming(array).is.not.a(Error));
test('array is not a Date', () => assuming(array).is.not.a(Date));
test('array is not a RegExp', () => assuming(array).is.not.a(RegExp));

console.log();
console.log('function');
console.log();

function foo() {
  return 1;
}

test('function is function', () => assuming(foo).is(foo));
test('function is not null', () => assuming(foo).is.not(null));
test('function is not 1', () => assuming(foo).is.not(1));
test('function is not "abc"', () => assuming(foo).is.not('abc'));
test('function is not false', () => assuming(foo).is.not(false));
test('function is not {foo: 2}', () => assuming(foo).is.not({foo: 2}));
test('function is not [2]', () => assuming(foo).is.not([2]));
test('function is not a Number', () => assuming(foo).is.not.a(Number));
test('function is not a String', () => assuming(foo).is.not.a(String));
test('function is not a Boolean', () => assuming(foo).is.not.a(Boolean));
test('function is a Function', () => assuming(foo).is.a(Function));
test('function is not an Object', () => assuming(foo).is.not.a(Object));
test('function is not an Array', () => assuming(foo).is.not.a(Array));
test('function is not an Error', () => assuming(foo).is.not.a(Error));
test('function is not a Date', () => assuming(foo).is.not.a(Date));
test('function is not a RegExp', () => assuming(foo).is.not.a(RegExp));
