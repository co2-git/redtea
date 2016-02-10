'use strict';

import { EventEmitter } from 'events';
import sequencer from 'sequencer';

let id = 0;

class It extends EventEmitter {

  start;
  end;
  time;
  status = 'iddle';
  parents = [];
  children = [];
  passed = [];
  failed = [];

  constructor (label, story, parents) {
    super();

    this.parents = parents || [];
    this.label = label;
    this.story = story;

    if ( Array.isArray(story) ) {
      this.story = story[0];
    }

    this.status = 'ready';
    this.id = id++;
  }


  fails (error) {
    this.error = error;
    this.status = 'failed';
    this.emit('failed', this);
  }

  run () {
    return new Promise((ok, ko) => {

      this.start = Date.now();

      this.status = 'started';

      let fn, status;

      new Promise((ok, ko) => {
        try {

          if ( typeof this.story !== 'function' ) {
            const story = this.story;
            console.log(story);
            this.story = it => {
              it('should be a function', () => {
                throw new Error('Story must be a function, got ' + typeof story);
              });
            };
          }

          fn = this.story((label, story) => {
            const child = new It(label, story, this.parents.concat([this]))
              .on('test', test => {
                this.emit('test', test);

                if ( test !== child ) {
                  this.children.push(test);
                }
              })
              .on('error', this.emit.bind(this, 'error'))
              .on('failed', test => {
                this.emit('failed', test);
                this.failed.push(test);
              })
              .on('passed', test => {
                this.emit('passed', test);
                this.passed.push(test);
              });

            this.children.push(child);

            // child.run();
          });

          if ( fn && typeof fn.then === 'function' ) {
            return fn.then(ok).catch(error => {
              // this.emit('test', this);
              this.fails(error);
              return ok();
            });
          }

          ok();
        }
        catch ( error ) {
          // this.emit('test', this);
          this.end = Date.now();
          this.time = this.end - this.start;
          this.fails(error);
          return ok();
        }
      })

      .then(() => {
        this.emit('test', this);

        sequencer(this.children.map(child => () => child.run()))
          .then(() => {
            // console.log('all child OK'.green, this.label);

            this.end = Date.now();
            this.time = this.end - this.start;

            if ( this.status !== 'failed' ) {
              this.emit('passed', this);

              this.status = 'passed';
            }

            ok(this);
          })
          .catch(error => {
            this.end = Date.now();
            this.time = this.end - this.start;

            this.fails(error);
          });
      })

      .catch(error => {
        this.end = Date.now();
        this.time = this.end - this.start;

        this.fails(error);
      });

    });
  }

}

export default It;
