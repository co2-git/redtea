'use strict';

import describe from '../';
import should from 'should';

function test () {
  return describe ( 'New format' , it => {
    it ( 'should be cool' , ok => ok() );
    it ( 'should be nested' , [
      { 'should be true' : ok => ok() }
    ]);
  });
}

export default test;
