// @flow
import run from '../run';
import describe, {Redtea_Describe} from '../../lib/describe';

const label = 'hello';
const that = true;
const assertions = {value: true};
const obj = new Redtea_Describe(label, that, assertions);

const describer = describe(label, that, assertions);
const described = describer();

run('describe()', [
  {
    label: 'Redtea_Describe is a class',
    assert: typeof Redtea_Describe === 'function'
  },
  {
    label: 'new Redtea_Describe has label',
    assert: obj.label === label,
  },
  {
    label: 'new Redtea_Describe has that',
    assert: obj.that === that,
  },
  {
    label: 'new Redtea_Describe has assertions',
    assert: obj.assert === assertions,
  },
  {
    label: 'describe is a function',
    assert: typeof describe === 'function',
  },
  {
    label: 'describe returns a function',
    assert: typeof describer === 'function',
  },
  {
    label: 'function returns an instance of Redtea_Describe',
    assert: described instanceof Redtea_Describe,
  },
]);
