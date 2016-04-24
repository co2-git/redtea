// @flow
import colors from 'colors/safe';
import _ from 'lodash';
import indeed from '../lib/indeed';

function test(label: string, story: Function): void {
  try {
    const bool = story();
    if (!bool) {
      throw new Error('Assertion fails');
    }
    console.log(colors.green(`  √ ${label}`));
  } catch (error) {
    console.log(colors.red(`  × ${label}`));
    console.log(_.pick(error, ['subject', 'value', 'type', 'label']));
    console.log(colors.yellow(error.stack));
  }
}

console.log(colors.bold.underline.italic('indeed'));

console.log();
console.log('null');
console.log();

test('null is null', () => indeed(null).is(null));
test('null is not undefined', () => indeed(null).is.not(undefined));
test('null is not 1', () => indeed(null).is.not(1));
test('null is not "abc"', () => indeed(null).is.not('abc'));
test('null is not false', () => indeed(null).is.not(false));
test('null is not {}', () => indeed(null).is.not({}));
test('null is not []', () => indeed(null).is.not([]));
test('null is not a Number', () => indeed(null).is.not.a(Number));
test('null is not a String', () => indeed(null).is.not.a(String));
test('null is not a Boolean', () => indeed(null).is.not.a(Boolean));
test('null is not an Object', () => indeed(null).is.not.an(Object));
test('null is not an Array', () => indeed(null).is.not.an(Array));
test('null is not a Function', () => indeed(null).is.not.a(Function));
test('null is not an Error', () => indeed(null).is.not.an(Error));
test('null is not a Date', () => indeed(null).is.not.a(Date));
test('null is not a RegExp', () => indeed(null).is.not.a(RegExp));

console.log();
console.log('undefined');
console.log();

let undefinedVar;

test('undefined is undefined', () => indeed(undefinedVar).is(undefined));
test('undefined is not null', () => indeed(undefinedVar).is.not(null));
test('undefined is not 1', () => indeed(undefinedVar).is.not(1));
test('undefined is not "abc"', () => indeed(undefinedVar).is.not('abc'));
test('undefined is not false', () => indeed(undefinedVar).is.not(false));
test('undefined is not {}', () => indeed(undefinedVar).is.not({}));
test('undefined is not []', () => indeed(undefinedVar).is.not([]));
test('undefined is not a Number', () => indeed(undefinedVar).is.not.a(Number));
test('undefined is not a String', () => indeed(undefinedVar).is.not.a(String));
test('undefined is not a Boolean', () => indeed(undefinedVar).is.not.a(Boolean));
test('undefined is not an Object', () => indeed(undefinedVar).is.not.an(Object));
test('undefined is not an Array', () => indeed(undefinedVar).is.not.an(Array));
test('undefined is not a Function', () => indeed(undefinedVar).is.not.a(Function));
test('undefined is not an Error', () => indeed(undefinedVar).is.not.an(Error));
test('undefined is not a Date', () => indeed(undefinedVar).is.not.a(Date));
test('undefined is not a RegExp', () => indeed(undefinedVar).is.not.a(RegExp));

console.log();
console.log('number');
console.log();

const number = 1;

test('number is 1', () => indeed(number).is(1));
test('number is not null', () => indeed(number).is.not(null));
test('number is not undefined', () => indeed(number).is.not(undefined));
test('number is not 2', () => indeed(number).is.not(2));
test('number is not "abc"', () => indeed(number).is.not('abc'));
test('number is not false', () => indeed(number).is.not(false));
test('number is not {}', () => indeed(number).is.not({}));
test('number is not []', () => indeed(number).is.not([]));
test('number is a Number', () => indeed(number).is.a(Number));
test('number is not a String', () => indeed(number).is.not.a(String));
test('number is not a Boolean', () => indeed(number).is.not.a(Boolean));
test('number is not an Object', () => indeed(number).is.not.an(Object));
test('number is not an Array', () => indeed(number).is.not.an(Array));
test('number is not a Function', () => indeed(number).is.not.a(Function));
test('number is not an Error', () => indeed(number).is.not.an(Error));
test('number is not a Date', () => indeed(number).is.not.a(Date));
test('number is not a RegExp', () => indeed(number).is.not.a(RegExp));

console.log();
console.log('string');
console.log();

const string = 'abc';

test('string is "abc"', () => indeed(string).is("abc"));
test('string is not null', () => indeed(string).is.not(null));
test('string is not undefined', () => indeed(string).is.not(undefined));
test('string is not 2', () => indeed(string).is.not(2));
test('string is not "def"', () => indeed(string).is.not('def'));
test('string is not false', () => indeed(string).is.not(false));
test('string is not {}', () => indeed(string).is.not({}));
test('string is not []', () => indeed(string).is.not([]));
test('string is not a Number', () => indeed(string).is.not.a(Number));
test('string is a String', () => indeed(string).is.a(String));
test('string is not a Boolean', () => indeed(string).is.not.a(Boolean));
test('string is not an Object', () => indeed(string).is.not.an(Object));
test('string is not an Array', () => indeed(string).is.not.an(Array));
test('string is not a Function', () => indeed(string).is.not.a(Function));
test('string is not an Error', () => indeed(string).is.not.an(Error));
test('string is not a Date', () => indeed(string).is.not.a(Date));
test('string is not a RegExp', () => indeed(string).is.not.a(RegExp));

console.log();
console.log('boolean');
console.log();

const boolean = true;

test('boolean is true', () => indeed(boolean).is(true));
test('boolean is not null', () => indeed(boolean).is.not(null));
test('boolean is not undefined', () => indeed(boolean).is.not(undefined));
test('boolean is not 2', () => indeed(boolean).is.not(2));
test('boolean is not "abc"', () => indeed(boolean).is.not('abc'));
test('boolean is not false', () => indeed(boolean).is.not(false));
test('boolean is not {}', () => indeed(boolean).is.not({}));
test('boolean is not []', () => indeed(boolean).is.not([]));
test('boolean is not a Number', () => indeed(boolean).is.not.a(Number));
test('boolean is not a String', () => indeed(boolean).is.not.a(String));
test('boolean is a Boolean', () => indeed(boolean).is.a(Boolean));
test('boolean is not an Object', () => indeed(boolean).is.not.an(Object));
test('boolean is not an Array', () => indeed(boolean).is.not.an(Array));
test('boolean is not a Function', () => indeed(boolean).is.not.a(Function));
test('boolean is not an Error', () => indeed(boolean).is.not.an(Error));
test('boolean is not a Date', () => indeed(boolean).is.not.a(Date));
test('boolean is not a RegExp', () => indeed(boolean).is.not.a(RegExp));

console.log();
console.log('object');
console.log();

const object = {foo: 1};

test('object is {foo: 1}', () => indeed(object).is({foo: 1}));
test('object is not null', () => indeed(object).is.not(null));
test('object is not undefined', () => indeed(object).is.not(undefined));
test('object is not 2', () => indeed(object).is.not(2));
test('object is not "abc"', () => indeed(object).is.not('abc'));
test('object is not false', () => indeed(object).is.not(false));
test('object is not {foo: 2}', () => indeed(object).is.not({foo: 2}));
test('object is not []', () => indeed(object).is.not([]));
test('object is not a Number', () => indeed(object).is.not.a(Number));
test('object is not a String', () => indeed(object).is.not.a(String));
test('object is not a Boolean', () => indeed(object).is.not.a(Boolean));
test('object is an Object', () => indeed(object).is.an(Object));
test('object is not an Array', () => indeed(object).is.not.an(Array));
test('object is not a Function', () => indeed(object).is.not.a(Function));
test('object is not an Error', () => indeed(object).is.not.an(Error));
test('object is not a Date', () => indeed(object).is.not.a(Date));
test('object is not a RegExp', () => indeed(object).is.not.a(RegExp));

console.log();
console.log('array');
console.log();

const array = [1];

test('array is [1]', () => indeed(array).is([1]));
test('array is not null', () => indeed(array).is.not(null));
test('array is not undefined', () => indeed(array).is.not(undefined));
test('array is not 2', () => indeed(array).is.not(2));
test('array is not "abc"', () => indeed(array).is.not('abc'));
test('array is not false', () => indeed(array).is.not(false));
test('array is not {}', () => indeed(array).is.not({}));
test('array is not []', () => indeed(array).is.not([]));
test('array is not a Number', () => indeed(array).is.not.a(Number));
test('array is not a String', () => indeed(array).is.not.a(String));
test('array is not a Boolean', () => indeed(array).is.not.a(Boolean));
test('array is not an Object', () => indeed(array).is.not.an(Object));
test('array is an Array', () => indeed(array).is.an(Array));
test('array is not a Function', () => indeed(array).is.not.a(Function));
test('array is not an Error', () => indeed(array).is.not.an(Error));
test('array is not a Date', () => indeed(array).is.not.a(Date));
test('array is not a RegExp', () => indeed(array).is.not.a(RegExp));

console.log();
console.log('function');
console.log();

function foo() {
  return 1;
}

test('foo is foo', () => indeed(foo).is(foo));
test('foo is not null', () => indeed(foo).is.not(null));
test('foo is not undefined', () => indeed(foo).is.not(undefined));
test('foo is not 2', () => indeed(foo).is.not(2));
test('foo is not "abc"', () => indeed(foo).is.not('abc'));
test('foo is not false', () => indeed(foo).is.not(false));
test('foo is not {}', () => indeed(foo).is.not({}));
test('foo is not []', () => indeed(foo).is.not([]));
test('foo is not a Number', () => indeed(foo).is.not.a(Number));
test('foo is not a String', () => indeed(foo).is.not.a(String));
test('foo is not a Boolean', () => indeed(foo).is.not.a(Boolean));
test('foo is not an Object', () => indeed(foo).is.not.an(Object));
test('foo is not an Array', () => indeed(foo).is.not.an(Array));
test('foo is a Function', () => indeed(foo).is.a(Function));
test('foo is not an Error', () => indeed(foo).is.not.an(Error));
test('foo is not a Date', () => indeed(foo).is.not.a(Date));
test('foo is not a RegExp', () => indeed(foo).is.not.a(RegExp));
