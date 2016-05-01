import {describe, it} from '../lib/describe';

export default () => describe.batch('Describe',
  () => describe.batch('Promise',
    () => describe.promise(new Promise((r1) => r1(1)), it.should.be(1)),
  )
);
