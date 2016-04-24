/**
  * @name is
  * @description core library with should
  * @flow
**/

import should from 'should';

const is = (subject: any, value: any): void => {
  switch (value) {
  case null:
    should(subject).is.null();
    break;
  case undefined:
    should(subject).is.undefined();
    break;
  default:
    switch (typeof value) {
    case 'number':
    case 'string':
    case 'boolean':
      should(subject).is.exactly(value);
      break;
    case 'object':
      should(subject).deepEqual(value);
      break;
    }
    break;
  }
};

is.not = (subject: any, value: any): void => {
  switch (value) {
  case null:
    should(subject).is.not.null();
    break;
  case undefined:
    should(subject).is.not.undefined();
    break;
  default:
    switch (typeof value) {
    case 'number':
    case 'string':
    case 'boolean':
      should(subject).is.not.exactly(value);
      break;
    case 'object':
      should(subject).not.deepEqual(value);
      break;
    }
    break;
  }
};

is.type = (subject: any, type: Function): void => {
  switch (type) {
  case String:
  case Number:
  case Boolean:
    should(subject).be.a[type.name]();
    break;
  }
};

export default is;
