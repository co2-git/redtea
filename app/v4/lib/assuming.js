/**
  * @name assuming
  * @description test your code assertion-style
  * @flow
**/

import is from './is';

type TEST = {
  is: Function | {a: Function},
};

export default function assuming(subject: any): TEST {
  function asumingThat (value: any, not : boolean = false): void {
    if (not) {
      is.not(subject, value);
    } else {
      is(subject, value);
    }
  }

  function asumingThatNot(value: any) {
    return asumingThat(value, true);
  }

  function asumingThatA(type: Function, not : boolean = false): void {
    if (not) {
      is.not.type(subject, type);
    } else {
      is.type(subject, type);
    }
  }

  function asumingThatNotA(type: Function): void {
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
