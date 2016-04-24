/**
  * @name is
  * @description core library with should
  * @flow
**/

import _ from 'lodash';
import AssertionError from './AssertionError';

const is = (subject: any, value: any, not : boolean = false): void => {
  switch (value) {
  case null:
    if (not) {
      if (subject === null) {
        throw new AssertionError('Expected value not to be null',
          subject,
          value
        );
      }
    } else if (subject !== null) {
      throw new AssertionError('Expected value to be null', subject, value);
    }
    break;
  case undefined:
    if (not) {
      if (typeof subject === 'undefined') {
        throw new AssertionError('Expected value not to be undefined',
          subject, value);
      }
    } else if (typeof subject !== 'undefined') {
      throw new AssertionError('Expected value to be undefined',
        subject, value);
    }
    break;
  default:
    switch (typeof value) {
    case 'number':
    case 'string':
    case 'boolean':
      if (not) {
        if (subject === value) {
          throw new AssertionError('Expected value not to match',
            subject,
            value
          );
        }
      } else if (subject !== value) {
        throw new AssertionError('Expected value to match', subject, value);
      }
      break;
    case 'object':
      if (not) {
        if (_.isEqual(subject, value)) {
          throw new AssertionError('Expected value not to match',
            subject,
            value
          );
        }
      } else if (!_.isEqual(subject, value)) {
        throw new AssertionError('Expected value to match', subject, value);
      }
      break;
    case 'function':
      if (not && subject === value) {
        throw new AssertionError('Expected value not to match', subject, value);
      } else if (subject !== value) {
        throw new AssertionError('Expected value to match', subject, value);
      }
      break;
    default:
      throw new AssertionError('Could not determine value type',
        subject, value);
    }
    break;
  }
};

is.not = (subject: any, value: any): void => is(subject, value, true);

is.type = (subject: any, type: Function, not : boolean = false): void => {
  if (typeof type !== 'function') {
    throw new Error('Type must be a function');
  }
  switch (type) {
  case String:
    if (not) {
      if (typeof subject === 'string') {
        throw new AssertionError('Expected subject not to be a String',
          subject,
          null,
          String
        );
      }
    } else if (typeof subject !== 'string') {
      throw new AssertionError('Expected subject to be a String',
        subject,
        null,
        String
      );
    }
    break;
  case Number: {
    let isNumber;
    if (subject === null || typeof subject === 'undefined') {
      isNumber = false;
    } else {
      isNumber = subject.constructor === Number && isFinite(subject);
    }
    if (not) {
      if (isNumber) {
        throw new AssertionError('Expected subject not to be a Number',
          subject,
          null,
          Number
        );
      }
    } else if (!isNumber) {
      throw new AssertionError('Expected subject to be a Number',
        subject,
        null,
        Number
      );
    }
    break;
  }
  case Boolean:
    if (not) {
      if (typeof subject === 'boolean') {
        throw new AssertionError('Expected subject not to be a Boolean',
          subject,
          null,
          Boolean
        );
      }
    } else if (typeof subject !== 'boolean') {
      throw new AssertionError('Expected subject to be a Boolean',
        subject,
        null,
        Boolean
      );
    }
    break;
  case Function:
    if (not) {
      if (typeof subject === 'function') {
        throw new AssertionError('Expected subject not to be a Function',
          subject,
          null,
          Function
        );
      }
    } else if (typeof subject !== 'function') {
      throw new AssertionError('Expected subject to be a Function',
        subject,
        null,
        Function
      );
    }
    break;
  case Object: {
    const isObject = subject && typeof subject === 'object' && !Array.isArray(
      subject
    );
    if (not) {
      if (isObject) {
        throw new AssertionError('Expected subject not to be a Object',
          subject,
          null,
          Object
        );
      }
    } else if (!isObject) {
      throw new AssertionError('Expected subject to be a Object',
        subject,
        null,
        Object
      );
    }
    break;
  }
  case Array:
    if (not) {
      if (Array.isArray(subject)) {
        throw new AssertionError('Expected subject not to be an Array',
          subject,
          null,
          Array
        );
      }
    } else if (!Array.isArray(subject)) {
      throw new AssertionError('Expected subject to be an Array',
        subject,
        null,
        Array
      );
    }
    break;
  default:
    if (not) {
      if (subject instanceof type) {
        throw new AssertionError('Expected subject to be a ' + type.name,
          subject,
          null,
          type
        );
      }
    }
  }
};

is.not.type = (subject: any, type: Function)
  : void => is.type(subject, type, true);

export default is;
