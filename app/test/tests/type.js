// @flow
import describe from '../../';

export default describe.batch('Test type',
  describe('null', null, {type: null}),
  describe('number', 1, {type: Number}),
  describe('string', 'a', {type: String}),
  describe('boolean', true, {type: Boolean}),
);
