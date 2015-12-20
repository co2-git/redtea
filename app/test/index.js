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

    it ( 'should fulfill' , () => new Promise(ok => ok()) );

    it ( 'Nest' , [
      it => {

        it ( 'should be true' , () => {} );

        it ( 'should deep nest' , [

          it => {

            it ( 'should be cool' ,() => {} );

          }

        ]);

      }
    ] );

    it ( 'should reuse' , describe.use(() => reusable(true)) );

  } );
}

export default test;
