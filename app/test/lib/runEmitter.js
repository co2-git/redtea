// @flow
import {EventEmitter} from 'events';
import run from '../run';
import runEmitter from '../../lib/runEmitter';
import {Redtea_Emitter} from '../../lib/emitter';

const label = 'test emitter';
const emitter = new EventEmitter();
const runned = runEmitter(new Redtea_Emitter(
  label,
  emitter,
  {},
));

run('runEmitter()', [
  {
    label: 'runEmitter is a function',
    assert: typeof runEmitter === 'function',
  },
  {
    label: 'runEmitter returns an emitter',
    assert: runned instanceof EventEmitter,
  },
]);

emitter
  .on('start', (test) => {
    
  });
