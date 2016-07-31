// @flow
import run from './run';
import describe, {batch, promise, emitter} from '../';

run('index.js [module]', [
  {
    label: 'describe is a function',
    assert: typeof describe === 'function'
  },
  {
    label: 'describe.batch is a function',
    assert: typeof describe.batch === 'function'
  },
  {
    label: 'describe.promise is a function',
    assert: typeof describe.promise === 'function'
  },
  {
    label: 'describe.emitter is a function',
    assert: typeof describe.emitter === 'function'
  },
  {
    label: 'batch is a function',
    assert: typeof batch === 'function'
  },
  {
    label: 'promise is a function',
    assert: typeof promise === 'function'
  },
  {
    label: 'emitter is a function',
    assert: typeof emitter === 'function'
  },
]);
