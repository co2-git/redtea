/**
  * @name assuming
  * @description test your code assertion-style
  * @flow
**/

import is from './is';
import AssertionError from './AssertionError';

type TestType = {
  is: Function | {a: Function},
};

export default function assuming(subject: any): TestType {
  function asumingThat(value: any, not : boolean = false) {
    let result;
    if (not) {
      result = is.not(subject, value);
    } else {
      result = is(subject, value);
    }
    if (!result.passed) {
      throw new AssertionError(result.label, subject, value);
    }
  }

  function asumingThatNot(value: any): void {
    return asumingThat(value, true);
  }

  function asumingThatA(type: Function, not : boolean = false) {
    if (not) {
      is.not.type(subject, type);
    } else {
      is.type(subject, type);
    }
  }

  function asumingThatNotA(type: Function) {
    asumingThatA(type, true);
  }

  // eslint (a is too shot)
  const aa = 'a';

  asumingThat[aa] = asumingThatA;
  asumingThat.an = asumingThatA;
  asumingThat.not = asumingThatNot;
  asumingThat.not[aa] = asumingThatNotA;
  asumingThat.not.an = asumingThatNotA;

  return {
    is: asumingThat,
  };
}
