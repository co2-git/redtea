import {describe, it} from '../lib/describe';
import indeed from '../lib/indeed';

let undefinedVar;
const stringVar = 'a';
const numVar = 1;
const boolVar = true;
const objVar = {foo: 1};
const arrVar = [1];
const dateVar = new Date();
const error = new Error('Oops');
const regex = /.+/;

export default () => describe.batch('Indeed',
  () => describe.batch('null',
    () => describe(
      indeed(null).is.null,
      {as: 'null is null'},
      it.is.true
    ),
    () => describe(
      indeed(null).is.not.null,
      {as: 'null is not null'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.undefined,
      {as: 'null is undefined'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not.undefined,
      {as: 'null is not undefined'},
      it.is.true
    ),
    () => describe(
      indeed(null).is.true,
      {as: 'null is true'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not.true,
      {as: 'null is not true'},
      it.is.true
    ),
    () => describe(
      indeed(null).is.false,
      {as: 'null is false'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not.false,
      {as: 'null is not false'},
      it.is.true
    ),
    () => describe(
      indeed(null).is(0),
      {as: 'null is number 0'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not(0),
      {as: 'null is not number 0'},
      it.is.true
    ),
    () => describe(
      indeed(null).is(1),
      {as: 'null is number 1'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not(1),
      {as: 'null is not number 1'},
      it.is.true
    ),
    () => describe(
      indeed(null).is(''),
      {as: 'null is string ""'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not(''),
      {as: 'null is not string ""'},
      it.is.true
    ),
    () => describe(
      indeed(null).is('a'),
      {as: 'null is string "a"'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not('a'),
      {as: 'null is not string "a"'},
      it.is.true
    ),
    () => describe(
      indeed(null).is('A'),
      {as: 'null is string "A"'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not('A'),
      {as: 'null is not string "A"'},
      it.is.true
    ),
    () => describe(
      indeed(null).is({}),
      {as: 'null is object {}'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not({}),
      {as: 'null is not object {}'},
      it.is.true
    ),
    () => describe(
      indeed(null).is({foo: 1}),
      {as: 'null is object {foo: 1}'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not({foo: 1}),
      {as: 'null is not object {foo: 1}'},
      it.is.true
    ),
    () => describe(
      indeed(null).is({foo: 2}),
      {as: 'null is object {foo: 2}'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not({foo: 2}),
      {as: 'null is not object {foo: 2}'},
      it.is.true
    ),
    () => describe(
      indeed(null).is({foo: 1, bar: {barz: 0}}),
      {as: 'null is object {foo: 1, bar: {barz: 0}}'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not({foo: 1, bar: {barz: 0}}),
      {as: 'null is not object {foo: 1, bar: {barz: 0}}'},
      it.is.true
    ),
    () => describe(
      indeed(null).is([]),
      {as: 'null is array []'},
      it.is.false
    ),
    () => describe(
      indeed(null).is.not([]),
      {as: 'null is not array []'},
      it.is.true
    ),
    () => describe(
      indeed(null).is.not.a.string,
      {as: 'null is not a string'},
      it.is.true
    ),
    () => describe(
      indeed(null).is.a.string,
      {as: 'null is a string'},
      it.is.false
    ),
  )
);
