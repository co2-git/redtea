'use strict';

import should from 'should';
import describe from '..';

function reusable (foo = 1) {
  return it => {
    it('foo should be 1', () => foo.should.be.exactly(1));
  };
}

function test (props) {
  return describe('redtea v2.1', it => {
    it('synchronous', () => 1);

    // it('throw', () => { throw new Error('Throw') });

    it('fulfill', () => new Promise(ok => ok()));

    // it('reject', () => new Promise((ok, ko) => {
    //   ko(new Error('Reject'));
    // }));

    it('time out', () => new Promise((ok, ko) => {
      setTimeout(ok, 1000);
    }));

    it('Nest -- closure', it => {
      it('should be nested closure', () => 1);

      it('should nest closure', it => {
        it('should be nested closure', () => 1);
      });
    });

    it('Nest -- array style', [it => {
      it('should be nested array style', () => 1);

      it('should nest', it => {
        it('should be nested array style', () => 1);
      });
    }]);

    it('1', it => {
      it('2');

      it('3', it => {
        it('4');

        it('5', it => {
          it('6');

          it('7', it => {
            it('8');
          });
        });

        it('9', it => {
          it('10');
        });
      });

      it('reusable', it => reusable()(it));

      it('reusable old synatx', describe.use(() => reusable()));

    });

  });
}

export default test;
