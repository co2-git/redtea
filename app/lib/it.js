// @flow weak

import {EventEmitter} from 'events';
import sequencer from 'promise-sequencer';

let id = 0;

export default class It extends EventEmitter {

  label: string;
  story: Function;
  start: number;
  end: number;
  time: number;
  status: 'iddle' | 'ready' | 'failed' | 'started' | 'passed' = 'iddle';
  parents: Array<It> = [];
  children = [];
  passed = [];
  failed = [];
  id: number;
  error: ?Error;

  constructor (label: string, story: Function, parents: Array<It>) {
    super();

    this.parents = parents || [];
    this.label = label;
    this.story = story;

    this.status = 'ready';
    this.id = id++;
  }

  fails (error) {
    this.error = error;
    this.status = 'failed';
    this.emit('failed', this);
  }

  run () {
    return new Promise((resolveRun) => {
      this.start = Date.now();
      this.status = 'started';
      let fn: ?Function;

      new Promise((resolve) => {
        try {
          if (typeof this.story !== 'function') {
            const story = this.story;
            this.story = it => {
              it('should be a function', () => {
                throw new Error(
                  `Story must be a function, got ${typeof story}`
                );
              });
            };
          }

          fn = this.story((label, story) => {
            const child = new It(label, story, this.parents.concat([this]))
              .on('test', test => {
                this.emit('test', test);
                if (test !== child) {
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
          });

          if (fn && typeof fn.then === 'function') {
            return fn.then(resolve).catch(error => {
              // this.emit('test', this);
              this.fails(error);
              return resolve();
            });
          }

          resolve();
        } catch (error) {
          this.end = Date.now();
          this.time = this.end - this.start;
          this.fails(error);
          return resolve();
        }
      })

      .then(() => {
        this.emit('test', this);
        sequencer(this.children.map(child => () => child.run()))
          .then(() => {
            // console.log('all child OK'.green, this.label);

            this.end = Date.now();
            this.time = this.end - this.start;

            if (this.status !== 'failed') {
              this.emit('passed', this);

              this.status = 'passed';
            }

            resolveRun(this);
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
