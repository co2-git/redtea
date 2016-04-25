/**
  * @name is
  * @description core library with should
  * @flow
**/

import _ from 'lodash';
import AssertionError from './AssertionError';
import format from './format';

export type $is = {
  label: string,
  passed: boolean,
  subject: any,
  value?: any,
  type?: Function,
  event?: string,
};

const is = (subject: any, value: any, not : boolean = false): $is => {
  const label = `${format(subject)} is ${not ? 'not ' : ''}${format(value)}`;
  let passed;
  switch (value) {
  case null:
    passed = subject === null;
    break;
  case undefined:
    passed = typeof subject === 'undefined';
    break;
  default:
    switch (typeof value) {
    case 'number':
    case 'string':
    case 'boolean':
    case 'function':
      passed = subject === value;
      break;
    case 'object':
      passed = _.isEqual(subject, value);
      break;
    default:
      throw new AssertionError('Could not determine value type',
        subject, value);
    }
    break;
  }
  if (not) {
    passed = !passed;
  }
  return {label, subject, value, passed};
};

is.not = (subject: any, value: any): Object => is(subject, value, true);

is.type = (subject: any, type: Function, not : boolean = false): Object => {
  if (typeof type !== 'function') {
    throw new Error('Type must be a function');
  }
  const article = /^(a|e|i|o|u)/i.test(type.name) ? 'an' : 'a';
  const label =
    `${format(subject)} is ${not ? 'not ' : ''}${article} ${type.name}`;
  let passed;
  switch (type) {
  case String:
    passed = typeof subject === 'string';
    break;
  case Number: {
    if (subject === null || typeof subject === 'undefined') {
      passed = false;
    } else {
      passed = subject.constructor === Number && isFinite(subject);
    }
    break;
  }
  case Boolean:
    passed = typeof subject === 'boolean';
    break;
  case Function:
    passed = typeof subject === 'function';
    break;
  case Object: {
    passed = subject && typeof subject === 'object' && !Array.isArray(
      subject
    );
    break;
  }
  case Array:
    passed = Array.isArray(subject);
    break;
  default:
    passed = Boolean(subject instanceof type);
    break;
  }
  if (not) {
    passed = !passed;
  }
  return {label, subject, type, passed};
};

is.not.type = (subject: any, type: Function)
  : Object => is.type(subject, type, true);

export default is;
