import {EventEmitter} from 'events';

export default class Emitter extends EventEmitter {
  nextTick = false;

  emit(...messages) {
    if (this.nextTick) {
      super.emit(...messages);
    } else {
      process.nextTick(() => {
        this.nextTick = true;
        super.emit(...messages);
      });
    }
  }
}
