import Emitter from './Emitter';
import BatchEmitter from './BatchEmitter';

export default function describe() {
  return new Emitter();
}

describe.batch = (label: string, ...describers) => {
  console.log('new batch', label);
  const emitter = new BatchEmitter(label);

  let cursor = 0;

  function run() {
    console.log('running batch describer', {cursor, describers: describers.length});
    if (describers[cursor]) {
      describers[cursor]()
        .on('error', error => emitter.emit('error', error))
        .on('batch', _label => emitter.emit('batch', _label));
    } else {
      console.log('COMPLETE batch');
      emitter.emit('complete');
    }
  }

  run();

  return emitter;
};
