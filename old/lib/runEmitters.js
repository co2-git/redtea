import 'babel-polyfill';
import Emitter from './Emitter';

export default function runEmitters(...functions) {
  const emitter = new Emitter();

  process.nextTick(() => {
    let cursor = 0;

    function run() {
      if (functions[cursor]) {
        functions[cursor]()
          .on('error', error => emitter.error(error))
          .on('batch', label => emitter.emit('batch', label))
          .on('complete', () => {
            console.log('COMPLETE!!');
            emitter.emit('complete');
            cursor++;
            run();
          });
      } else {
        console.log('OVER');
        emitter.emit('over');
      }
    }

    run();
  });

  return emitter;
}
