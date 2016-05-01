import {describe, it} from '../lib/describe';

let undefinedVar;
const stringVar = 'a';
const numVar = 1;
const boolVar = true;
const objVar = {foo: 1};
const arrVar = [1];
const dateVar = new Date();
const error = new Error('Oops');
const regex = /.+/;

export default () => describe.batch('Is',
  () => describe(null,
    it.is.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.not.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(undefinedVar,
    it.is.not.null,
    it.is.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.not.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(stringVar,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.not.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(numVar,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.not.a.string,
    it.is.a.number,
    it.is.not.a.boolean,
    it.is.not.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(boolVar,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.a.boolean,
    it.is.not.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(objVar,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is({foo: 1}),
    it.is.not({foo: 2}),
    it.is.not({foo: 1, vv: 2}),
    it.is.not([]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(arrVar,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is([1]),
    it.is.not([true]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.not.an.object,
    it.is.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(dateVar,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.not([true]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(error,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.not([true]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.an.error,
    it.is.not.a.date,
    it.is.not.a.regular.expression,
  ),

  () => describe(regex,
    it.is.not.null,
    it.is.not.undefined,
    it.is.not(0),
    it.is.not(1),
    it.is.not(''),
    it.is.not('a'),
    it.is.not('b'),
    it.is.not.true,
    it.is.not.false,
    it.is.not({}),
    it.is.not([]),
    it.is.not([true]),
    it.is.not.a.string,
    it.is.not.a.number,
    it.is.not.a.boolean,
    it.is.an.object,
    it.is.not.an.array,
    it.is.not.a.function,
    it.is.not.an.error,
    it.is.not.a.date,
    it.is.a.regular.expression,
  ),
);