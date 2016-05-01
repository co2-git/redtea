/**
  * @name indeed
  * @description test your code boolean-style
  * @flow
**/

import is from './is';

type TEST = {
  is: Function | {a: Function},
};

export default function indeed(subject: any): TEST {
  function isIndeed (value: any, not : boolean = false): boolean {
    const test = is(subject, value);
    return not ? !test.passed : test.passed;
  }

  function isIndeedNot(value: any) {
    return isIndeed(value, true);
  }

  function isIndeedA(type: Function, not : boolean = false): boolean{
    const test = is.type(subject, type);
    return not ? !test.passed : test.passed;
  }

  function isIndeedNotA(type: Function): boolean {
    return isIndeedA(type, true);
  }

  // eslint (a is too shot)
  const aa = 'a';

  isIndeed[aa] = isIndeedA;
  isIndeed.an = isIndeedA;
  isIndeed.not = isIndeedNot;
  isIndeed.not[aa] = isIndeedNotA;
  isIndeed.not.an = isIndeedNotA;
  isIndeed.null = isIndeed(null);
  isIndeedNot.null = isIndeedNot(null);
  isIndeed.undefined = isIndeed(undefined);
  isIndeedNot.undefined = isIndeedNot(undefined);
  isIndeed.true = isIndeed(true);
  isIndeedNot.true = isIndeedNot(true);
  isIndeed.false = isIndeed(false);
  isIndeedNot.false = isIndeedNot(false);
  isIndeedA.string = isIndeedA(String);
  isIndeedNotA.string = isIndeedNotA(String);

  return {
    is: isIndeed,
  };
}
