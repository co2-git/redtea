import describe from './lib/describe';
import batch from './lib/batch';
import promise from './lib/promise';

describe.batch = batch;
describe.promise = promise;

export default describe;

export {batch, promise};
