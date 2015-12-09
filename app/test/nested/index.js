'use strict';

import describe from '../';
import should from 'should';

function reusable (foo) {
  return it => {
    it('should be true value', ok => {
      foo.should.be.true();
      ok();
    });
  };
}

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

    it ( 'should reuse' , describe.use(() => reusable(true)) );

  } );
}

export default test;
