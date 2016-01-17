'use strict';

import It from './lib/it';

function describe(label, story) {
  const test = new It(label, story);
  const promise = test.run();
  promise.live = test;
  return promise;
}

describe.use = fn => {
  return it => fn()(it);
};

describe.pause = ms => {
  return it => it('should pause', () => new Promise(ok => setTimeout(ok, ms)));
};

export default describe;
