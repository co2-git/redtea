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
    try {
      if (not) {
        is.not(subject, value);
      } else {
        is(subject, value);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  function isIndeedNot(value: any) {
    return isIndeed(value, true);
  }

  function isIndeedA(type: Function, not : boolean = false): boolean{
    try {
      if (not) {
        is.not.type(subject, type);
      } else {
        is.type(subject, type);
      }
      return true;
    } catch (error) {
      return false;
    }
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

  return {
    is: isIndeed,
  };
}
