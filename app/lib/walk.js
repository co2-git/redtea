// @flow
import _ from 'lodash';
import format from './format';
import checkType from './type';
import type {
  ASSERTIONS,
  REPORT,
  WALKER,
} from '../config/types';

function walkNot(walker: WALKER) {
  walk({...walker, not: true});
}

function walkValue(walker: WALKER) {
  const valid = _.isEqual(walker.that, walker.assertions.value);
  walker.report({
    type: 'value',
    expected: walker.not ?
      {not: walker.assertions.value} : walker.assertions.value,
    that: walker.that,
    valid: walker.not ? !valid : valid,
    message: `${walker.ns} is ${walker.not ? 'not ' : ''}` +
      format(walker.assertions.value),
  });
}

function walkType(walker: WALKER) {
  let isA;
  if (Array.isArray(walker.assertions.type)) {
    isA = walker.assertions.type[0] ?
      walker.assertions.type[0].name : format(walker.assertions.type[0]);
    isA = `array of ${isA}`;
  } else {
    isA = walker.assertions.type ?
      walker.assertions.type.name : format(walker.assertions.type);
  }
  const an = /^(a|i|o|u|e)/i.test(isA) ? 'an' : 'a';
  const valid = checkType(walker.that, walker.assertions.type);
  walker.report({
    type: 'type',
    expected: walker.assertions.type,
    that: walker.that,
    valid: walker.not ? !valid : valid,
    message: `is ${walker.not ? 'not ' : ''}${an} ${isA}`,
    error: !valid && new TypeError(
      `Expecting instance of ${format(walker.assertions.type)},` +
        ` instead got ${format(walker.that)}`
    ),
  });
}

function walkTypes(walker: WALKER) {
  const valid = (walker.assertions.types && walker.assertions.types.every(
    (type: ?Function|Function[]): boolean => checkType(walker.that, type)
  ) || false);
  walker.report({
    type: 'types',
    expected: walker.assertions.types,
    that: walker.that,
    valid: walker.not ? !valid : valid,
    message: `is ${walker.not ? 'not ' : ''} an instance of ` +
      `${
        walker.assertions.types.map(
          (type: string): string => format(type).replace(/^function /, '')
        ).join(', ')
      }`,
  });
}

function walkShape(walker: WALKER) {
  const ns = walker.ns || 'object';
  for (const key in walker.assertions.shape) {
    const valid = (key in walker.that);
    walker.report({
      type: 'shape',
      expected: key,
      that: walker.that,
      valid: walker.not ? !valid : valid,
      message: `${ns} has key ${key}`,
      error: !valid && new TypeError(`Expected ${format(walker.that)}.${key}`),
    });
    if (valid) {
      walk({
        ...walker,
        that: walker.that[key],
        assertions: walker.assertions.shape[key],
        ns: `${ns}.${key}`,
      });
    }
  }
}

export default function walk(walker: WALKER = {not: false}) {
  for (const type in walker.assertions) {
    if (type === 'not') {
      walkNot(walker);
    } else if (type === 'value') {
      walkValue(walker);
    } else if (type === 'type') {
      walkType(walker);
    } else if (type === 'types') {
      walkTypes(walker);
    } else if (type === 'shape') {
      walkShape(walker);
    }
  }
}
