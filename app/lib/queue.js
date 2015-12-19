'use strict';

import { EventEmitter } from 'events';

class Queue extends EventEmitter {

  queue = []

  passed = []

  failed = []

  id = 0

  processing = false

  get length () {
    return this.queue.length;
  }

  push(story) {

    story.id = this.id++;

    // console.log('pushing story'.grey.italic, story.label.grey, story.id, story.parent);

    // if ( 'parent' in story ) {
    //   const parent = this.findById(story.parent);
    //
    //   if ( ! parent.children ) {
    //     parent.children = {};
    //   }
    //
    //   parent.children[story.id] = null;
    //
    //   parent.stats.tests ++;
    // }

    this.queue.push(story);

    // console.log(this.processing.toString().magenta);

    if ( ! this.processing ) {
      this.resume();
    }

    return story.id;
  }

  findById(id, ...types) {
    if ( ! types.length ) {
      types = ['queue', 'passed', 'failed'];
    }

    const all = [];

    for ( let type of types ) {
      all.push(...this[type]);
    }

    return all.reduce((match, story) => {
      if ( story.id === id ) {
        match = story;
      }
      return match;
    }, null);
  }

  resume() {
    this.processing = true;

    if ( this.queue[0] ) {
      // console.log('procesing', this.queue[0].label);
      this.queue[0].story().then(
        () => {
          // console.log(this.queue[0].tab, '✔'.green.bold, this.queue[0].label.grey);
          this.emit('success', this.queue[0]);

          this.queue[0].success();

          // if ( 'parent' in this.queue[0] ) {
          //   const parent = this.findById(this.queue[0].parent);
          //
          //   // parent.children[this.queue[0].id] = true;
          //
          //   parent.success();
          // }

          this.passed.push(this.queue.shift());
          this.resume();
        },
        error => {
          // console.log(this.queue[0].tab, '✖'.red.bold, this.queue[0].label.red);

          if ( ! this.queue[0].nested ) {
            this.queue[0].error(error);
          }

          // if ( 'parent' in this.queue[0] ) {
          //   const parent = this.findById(this.queue[0].parent);
          //
          //   parent.error(error);
          // }

          this.failed.push({ error, func : this.queue.shift() });
          this.resume();
        }
      );
    }
    else {
      this.processing = false;
    }
  }
}


export default Queue;
// export default new Queue();
