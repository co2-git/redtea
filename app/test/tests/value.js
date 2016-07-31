// @flow
import describe from '../../';

export default describe.batch('Test value',
  describe('null', null, {value: null}),
  describe('number', 1, {value: 1}),
  describe('string', 'a', {value: 'a'}),
  describe('boolean', true, {value: true}),
);
