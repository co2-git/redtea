import {EventEmitter} from 'events';
import {describe, it} from '../lib/describe';
import assuming from '../lib/assuming';
import AssertionError from '../lib/AssertionError';

export default (): EventEmitter => describe.batch('Assuming',
  (): EventEmitter => describe.batch('throwing',
    (): EventEmitter => describe((): void => assuming(null).is(null),
      it.is.not.throwing(Error)),
    (): EventEmitter => describe((): void => assuming(null).is.not(null),
      it.is.throwing(AssertionError),
      it.is.not.throwing(Error)
    ),
  )
);
