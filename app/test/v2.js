'use strict';

import describe from '../lib/v2';
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

    it('1 should be true', () => true.should.be.true());

    it('2 should be false', () => true.should.be.false());

    it('3 should fulfill', () => new Promise(ok => ok()));
    
    it('4 should fulfill in 1.5 seconds', () => new Promise((ok, ko) => {
      setTimeout(ok, 1500);
    }));


  } );
}

export default test;

test().then(console.log.bind(console, 'ok'), console.log.bind(console, 'ko'));
