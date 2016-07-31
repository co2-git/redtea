// @flow
import {EventEmitter} from 'events';
import runTest from '../run';
import describe from '../../lib/describe';
import run from '../../lib/run';

const foo: Function = (): Function => describe(
  'Value check for number',
  1,
  {value: 1}
);

const running = run(foo);

runTest('run()', [
  {
    label: 'run is a function',
    assert: typeof run === 'function',
  },
  {
    label: 'run() returns an emitter',
    assert: running instanceof EventEmitter,
  }
]);
