'use strict';

import describe from '../';
import should from 'should';

function test () {
  return describe ( 'New format' , it => {
    it ( 'should be cool' , ok => ok() );
    it.describe ( 'should be nested' , it => {
      it ( 'should be supa cool' , ok => ok() );
    });
  });
}

export default test;
