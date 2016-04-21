// @flow weak

import It from './lib/it';

function describe(label: string, story: Function): Promise {
  const test = new It(label, story);
  const promise = test.run();
  promise.live = test;
  return promise;
}

describe.use = (fn: Function): Function => {
  return (it: Function): Function => fn()(it);
};

describe.pause = (ms: number): Function => {
  return (it: Function): Function =>
    it('should pause', () => new Promise(ok => setTimeout(ok, ms)));
};

export default describe;
