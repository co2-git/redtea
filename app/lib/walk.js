// @flow
import _ from 'lodash';
import format from './format';
import checkType from './type';
import type {
  ASSERTIONS,
  REPORT,
} from '../config/types';

export default function walk(
  that: any,
  assertions: ASSERTIONS,
  reporter: (report: REPORT) => void,
  not: boolean = false
) {
  for (const type in assertions) {
    switch (type) {
    default: {
      break;
    }
    case 'not': {
      walk(that, assertions.not, reporter, true);
      break;
    }
    case 'value': {
      const valid = _.isEqual(that, assertions.value);
      reporter({
        type,
        expected: not ? {not: assertions[type]} : assertions[type],
        that,
        valid: not ? !valid : valid,
        message: `is ${not ? 'not ' : ''}${format(assertions.value)}`,
      });
      break;
    }
    case 'type': {
      let isA;
      if (Array.isArray(assertions.type)) {
        isA = assertions.type[0] ?
          assertions.type[0].name : format(assertions.type[0]);
        isA = `is an array of ${isA}`;
      } else {
        isA = assertions.type ?
          assertions.type.name : format(assertions.type);
      }
      const an = /^(a|i|o|u|e)/i.test(isA) ? 'an' : 'a';
      const valid = checkType(that, assertions.type);
      reporter({
        type,
        expected: assertions.type,
        that,
        valid: not ? !valid : valid,
        message: `is ${not ? 'not ' : ''}${an} ${isA}`,
      });
      break;
    }
    case 'types': {
      const valid = assertions.types.every(type => checkType(that, type));
      reporter({
        type,
        expected: assertions.types,
        that,
        valid: not ? !valid : valid,
        message: `is ${not ? 'not ' : ''} an instance of ` +
          `${
            assertions.types.map(
              type => format(type).replace(/^function /, '')
            ).join(', ')
          }`,
      });
      break;
    }
    case 'shape': {
      console.log({that, assertions});
    }
    }
  }
}
