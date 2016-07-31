// @flow
import {EventEmitter} from 'events';
import run from '../run';
import emitter, {Redtea_Emitter} from '../../lib/emitter';


const label1 = 'hello';
const _emitter1 = (): EventEmitter => new EventEmitter();
const assertions1 = {value: true};
const obj1 = new Redtea_Emitter(label1, _emitter1, assertions1);

const caller1 = emitter(label1, _emitter1, assertions1);
const called1 = caller1();

run('emitter()', [
  {
    label: 'Redtea_Emitter is a class',
    assert: typeof Redtea_Emitter === 'function'
  },
  {
    label: 'new Redtea_Emitter has label',
    assert: obj.label === label,
  },
  {
    label: 'new Redtea_Emitter has emitter',
    assert: obj.emitter === _emitter,
  },
  {
    label: 'new Redtea_Emitter has assertions',
    assert: obj.assertions === assertions,
  },
  {
    label: 'emitter is a function',
    assert: typeof caller === 'function',
  },
  {
    label: 'emitter returns an instance of Redtea_Emitter',
    assert: called instanceof Redtea_Emitter,
  },
  {
    label: 'new Redtea_Emitter has label',
    assert: obj1.label === label1,
  },
  {
    label: 'new Redtea_Emitter has emitter',
    assert: obj1.emitter === _emitter1,
  },
  {
    label: 'new Redtea_Emitter has assertions',
    assert: obj1.assertions === assertions1,
  },
  {
    label: 'emitter is a function',
    assert: typeof caller1 === 'function',
  },
  {
    label: 'emitter returns an instance of Redtea_Emitter',
    assert: called1 instanceof Redtea_Emitter,
  },
]);
