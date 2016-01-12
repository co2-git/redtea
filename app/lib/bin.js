'use strict';

import { EventEmitter }           from 'events';
import fs                         from 'fs-extra';
import path                       from 'path';
import child_process              from 'child_process';
import colors                     from 'colors';
import sequencer                  from 'sequencer';
import describe                   from '..';

let i = 0

class Bin extends EventEmitter {

  id = i++

  tests = 0

  passed = 0

  failed = 0

  time = 0

  /** [<function>] */
  required = []

  /** <number> */
  startsAt

  /** <number> */
  stopsAt

  // if paths are relative
  dir = ''

  /** [<string>]] */
  files = []

  /** [<string>]] */
  flags = []

  done = false

  constructor (files, props, flags) {

    super();

    // Start timer

    this.startsAt = Date.now();

    // Begin

    process.nextTick(() => {

      try {
        this.flags = flags;

        sequencer(

          () => this.getFiles(...files),

          () => this.getFunctions(),

          () => this.runFunctions()

        )
          .then(() => {

            this.done = true;

            this.stopsAt = Date.now();

            this.emit('passed');
          })

          .catch(this.emit.bind(this, 'error'));
      }
      catch ( error ) {
        this.emit('error', error);

      }
    });

  }

  getFiles (...files) {
    return new Promise((ok, ko) => {
      try {

        const promises = files.map(file => new Promise((ok, ko) => {

          try {

            const absolutePath = /^\//.test(file) ? file :
              path.join(process.cwd(), file);

            this.getFile(absolutePath).then(ok, ko);

          }

          catch ( error ) { ko(error) }

        }));

        Promise.all(promises).then(ok, ko);

      }

      catch ( error ) { ko(error) }

    });
  }

  getFile (file) {
    return sequencer(

      () => sequencer.promisify(fs.stat, [file]),

      stat => new Promise((ok, ko) => {
        if ( stat.isDirectory() ) {
          this.scandir(file)
            .then(files => {
              this.getFiles(...files).then(ok, ko);
            })
            .catch(ko)
        }
        else {
          if ( this.files.indexOf(file) === -1 ) {
            this.files.push(file);
          }
          ok();
        }
      })

    );
  }

  scandir (dir) {
    return new Promise((ok, ko) => {

      const files = [];

      fs.walk(dir)
        .on('error', ko)
        .on('data', file => {
          if ( file.path.replace(/\/$/, '') !== dir.replace(/\/$/, '') ) {
            files.push(file.path);
          }
        })
        .on('end', () => ok(files));
    });
  }

  getFunctions () {

    const requires = this.files.map(file => new Promise((ok, ko) => {

      if ( this.flags.indexOf('fork') > -1 ) {
        this.required.push(this.fork(file));
      }
      else {
        this.required.push(require(file));
      }
      ok();
    }));

    return Promise.all(requires);
  }

  runFunctions () {
    return sequencer(this.required.map(fn => () => new Promise((ok, ko) => {
      fn()
        .then(stats => {
          this.tests += stats.tests;
          this.passed += stats.passed;
          this.failed += stats.failed;
          this.time += stats.time;
          ok();
        })
        .catch(ko);
    })));
  }

  fork (file) {
    let results = {};

    return props => new Promise((ok, ko) => {
      const child = child_process.fork(
        path.resolve(__dirname, '../bin/index.js'),
        [file]
      );

      child
        .on('error', ko)
        .on('exit', () => ok(results))
        .on('message', message => {

          message = JSON.parse(message);

          if ( 'redtea' in message ) {
            const { redtea } = message;

            results = redtea;
          }
        });
    });
  }
}

export default Bin;
