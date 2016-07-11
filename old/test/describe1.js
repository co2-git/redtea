import describe from '../lib/describe1';

export default () => describe.batch('BATCH 1',
  () => describe.batch('BATCH 1.1')
);
