import {describe, it} from '../lib/describe';

export default () => describe.batch('test 1 & 2',
  () => describe(1,
    it.is(1),
    it.is.a(Number),
    it.is.not(2),
    it.is.not.a(String)
  ),
  () => describe(2,
    it.is(2),
    it.is.a(Number),
    it.is.not(1),
    it.is.not.a(Boolean)
  ),
  () => describe.batch('test 3 & 4(with errrors)',
    () => describe(3,
      it.is(3),
      it.is.a(Number),
      it.is.not(2),
      it.is.not.an(Object)
    ),
    () => describe(4,
      it.is(3),
      it.is.a(Number),
      it.is.not(2),
      it.is.not.an(Error)
    )
  )
);
