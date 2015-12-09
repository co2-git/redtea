'use strict';

import describe from '../';
import should from 'should';

function test () {

  return describe ( 'redtea' , it => {

    it ( 'should fulfill' , ok => ok() );

    it ( 'Nest' , [
      it => {

        it ( 'should be true' , ok => ok() );

        it ( 'should deep nest' , [

          it => {

            it ( 'should be cool' , ok => ok() );

          }

        ]);

      }
    ] );

  } );
}

export default test;
