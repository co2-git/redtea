import {describe, it} from '../lib/describe';

export default () => describe.batch('Describe',

  () => describe.batch('Simple',
    () => describe(1, it.is(1)),
  ),

  () => describe.batch('Object',
    () => describe(
      {foo: true},
        it.is.an.object((key, value) => {
        }),
        it.has.property('foo', foo => describe(foo, it.is.true)),
    )
  ),

  () => describe.batch(
    [{foo: true}, {foo: false}],
      it.is.an.array((item) => {
        describe(item, it.is.an.object);
      })
  ),

  () => describe.batch('Throw error',
    () => describe(
      () => {
        throw new Error('Foo');
      },
      it.throws(Error),
      it.has.property('message', message => {
        describe(message, it.is('Foo'));
      }),
    )
  ),

  () => describe.batch('Promise',
    () => describe.batch('Describe promise resolve',
      describe(new Promise((r1) => r1(1)), it.is(1)),
    ),
    () => describe.batch('Describe promise reject',
      describe(new Promise((r1, r2) => r2(new Error('Foo'))), it.is.an.error),
    ),
  )
);
