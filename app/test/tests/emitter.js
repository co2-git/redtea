// @flow
import {EventEmitter} from 'events';
import describe, {batch, promise, emitter} from '../../';

class Emitter extends EventEmitter {
  constructor() {
    super();
    process.nextTick(() => {
      this.emit('start', 1, true);
      this.emit('forEach', 1, 2, 3, 4);
    });
    setTimeout(() => {
      this.emit('emitsTooLate');
    }, 1000);
  }
}

export default batch('RedTea use cases',
  batch('Regular tests',
    describe('Null', null, {
      type: null,
      value: null,
      not: {
        type: Boolean,
        value: true,
      }
    }),
    describe('Boolean', true, {
      type: Boolean,
      value: true,
      not: {
        type: Number,
        value: false,
      }
    }),
    describe('Number', 1, {
      type: Number,
      value: 1,
      not: {
        type: String,
        value: 0,
      }
    }),
  ),
  batch('Promises',
    promise(
      'Verify then()',
      (): Promise<1> => new Promise((resolve: Function) => {
        resolve(1);
      }),
      {value: 1}
    ),
    promise(
      'Verify catch()',
      (): Promise<*> => new Promise((resolve: Function, reject: Function) => {
        reject(new Error('Ouch!'));
      }),
      {type: Error}
    )
  ),
  batch('Emitter',
    emitter('My Custom Emitter', (): Emitter => new Emitter(), {
      emits: {
        start: {
          wait: 500,
          messages: [
            {
              value: 1,
              type: Number,
            },
            {
              value: true,
              type: Boolean,
              not: {
                value: false,
              }
            },
          ],
        },
        neverEmits: {
          wait: 500,
        },
        emitsTooLate: {
          wait: 500,
        },
        forEach: {
          messages: {
            type: Number,
          },
        },
      },
      emitsNot: {
        foo: 1000,
      }
    })
  )
);
