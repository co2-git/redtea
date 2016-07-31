// @flow
import run from '../run';
import runDescribe from '../../lib/runDescribe';

run('runDescribe()', [
  {
    label: 'runDescribe is a function',
    assert: typeof runDescribe === 'function',
  }
]);
