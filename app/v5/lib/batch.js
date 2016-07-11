// @flow

import is from './is';

type TYPE = null | Function | Object | Mixed;

class Mixed {
  types: Array<Function> = [];
  constructor(...types) {
    this.types = types;
  }
}

function define(it: any, type: TYPE, checker: ?any) {
  let _type;
  let _is;
  if (type instanceof Mixed) {
    _type = type.types;
    _is = type.types.some(mixedType => is(it, mixedType));
  } else {
    _type = type;
    _is = is(it, type);
  }
  let _checked;
  if (typeof checker === 'function') {
    _checked = checker(it);
  } else if (arguments.length > 2) {
    _checked = it === checker;
  }
  console.log({it, type: _type, is: _is, checked: _checked});
}

// class Not {
//   constructor(type) {
//     this.type = type;
//   }
// }
//
// function not(type) {
//   return new Not(type);
// }
//
// define(1, Number);
// define(1, Mixed(Number, String));
// define(1, Not(String));
//
// define(1, Number, (num: number): boolean => num > 0.5);
//

define(1, Number);
define(1, new Mixed(Number, String));
define(1, Number, (number: number): boolean => number < 1);
define(1, Number, 1);
