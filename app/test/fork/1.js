'use strict';

import describe from '../..';

function a (props) {
  return describe('A', it => {
    it('ok', () => {});
  });
}

export default a;
