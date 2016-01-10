'use strict';

import describe from '../..';

function b (props) {
  return describe('B', it => {
    it('ko', () => { throw new Error('ko') });
  });
}

export default b;
