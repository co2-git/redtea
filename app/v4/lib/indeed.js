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
  const test = {
    is: (value: any): boolean => {
      try {
        is(subject, value);
        return true;
      } catch (error) {
        return false;
      }
    },
  };

  // eslint (a is too shot)
  const aa = 'a';

  test.is[aa] = (type: Function): boolean => {
    try {
      is.type(subject, type);
      return true;
    } catch (error) {
      return false;
    }
  };

  test.is.an = test.is.a;

  return test;
}
