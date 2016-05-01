/**
  * @name is
  * @description core library with should
  * @flow
**/

import _ from 'lodash';
import AssertionError from './AssertionError';
import format from './format';

export class Is {
  label: string;
  passed: boolean;
  subject: any;
  value: any;
  type: Function;
  event: string;

  constructor(label: string, subject: any, options: Object) {
    this.label = label;
    this.subject = subject;
    this.passed = options.passed;
    this.value = options.value;
    this.type = options.type;
    this.event = options.event;
  }
}

const is = (subject: any, value: any, not : boolean = false): Is => {
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
  return new Is(label, subject, {value, passed});
};

is.not = (subject: any, value: any): Object => is(subject, value, true);

is.type = (subject: any, type: Function, not : boolean = false): Object => {
  if (typeof type !== 'function') {
    throw new Error('Type must be a function');
  }
  let label = `${format(subject)} is ${not ? 'not ' : ''}`;
  switch (type) {
  case String:
  case Number:
  case Boolean:
  case Function:
  case Date:
    label += 'a ' + type.name.toLowerCase();
    break;
  case Object:
  case Array:
  case Error:
    label += 'an ' + type.name.toLowerCase();
    break;
  case RegExp:
    label += 'a regular expression';
    break;
  default: {
    const article = /^(a|e|i|o|u)/i.test(type.name) ? 'an' : 'a';
    label += `${article} ${type.name}`;
  }
  }
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
  return new Is(label, subject, {type, passed});
};

is.not.type = (subject: any, type: Function)
  : Object => is.type(subject, type, true);

export default is;
