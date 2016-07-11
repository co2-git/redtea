import Emitter from './Emitter';

export default class BatchEmitter extends Emitter {
  constructor(label: string) {
    super();
    this.emit('batch', label);
  }
}
