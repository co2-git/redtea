// @flow
import run from '../run';
import promise, {Redtea_Promise} from '../../lib/promise';

// const label = 'hello';
// const that = true;
// const assertions = {value: true};
// const obj = new Redtea_Promise(label, that, assertions);
//
// const promiser = promise(label, that, assertions);
// const promised = promiser();

run('promise()', [
  {
    label: 'Redtea_Promise is a class',
    assert: typeof Redtea_Promise === 'function'
  },
  // {
  //   label: 'new Redtea_Promise has label',
  //   assert: obj.label === label,
  // },
  // {
  //   label: 'new Redtea_Promise has that',
  //   assert: obj.that === that,
  // },
  // {
  //   label: 'new Redtea_Promise has assertions',
  //   assert: obj.assert === assertions,
  // },
  // {
  //   label: 'promise is a function',
  //   assert: typeof promise === 'function',
  // },
  // {
  //   label: 'promise returns a function',
  //   assert: typeof promiser === 'function',
  // },
  // {
  //   label: 'function returns an instance of Redtea_Promise',
  //   assert: promised instanceof Redtea_Promise,
  // },
]);
