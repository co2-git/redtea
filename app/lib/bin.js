'use strict';

import { EventEmitter }           from 'events';
import fs                         from 'fs-extra';
import path                       from 'path';
import child_process              from 'child_process';
import colors                     from 'colors';
import sequencer                  from 'sequencer';
import describe                   from '..';

let i = 0

function flattenArray (arr) {
  return arr.reduce((r, i, p) => {
      if ( Array.isArray(i) ) {
        r.push(...flattenArray(i));
      }
      else {
        r.push(i);
      }
      return r;
    },
    []
  );
}

class Bin extends EventEmitter {

  static getFiles (...files) {
    return new Promise((ok, ko) => {
      Promise
        .all(files.map(file => this.getFile(file)))
        .then(results => {
          results = flattenArray(results).reduce(
            (unique, r) => {
              if ( unique.indexOf(r) === -1 ) {
                unique.push(r);
              }
              return unique;
            },
            []
          );
          ok(results);
        })
        .catch(ko);
    });
  }

  static getFile (file) {

    file = /^\//.test(file) ? file : path.join(process.cwd(), file);

    return sequencer.pipe(

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
          ok(file);
        }
      })

    );
  }

  static scandir (dir) {
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

  static getFunctions (files, props = {}, flags = []) {
    return new Promise((ok, ko) => {
      try {
        const required = files.map(file => {
          if ( flags.indexOf('fork') > -1 ) {
            return this.fork(file);
          }

          let fn = require(file);

          if ( typeof fn.default === 'function' ) {
            fn = fn.default;
          }

          console.log({ fn });

          if ( typeof fn !== 'function' ) {
            let serialization = typeof fn;

            try {
              serialization += ' ' + JSON.stringify(fn);
            }
            catch ( error ) {}

            return props => describe('redtea imports file ' + file,
              it => {
                it('File should export a function', () => {
                  throw new Error('Expected a function, got ' + serialization);
                });
              }
            );
          }
          else {
            return fn;
          }
        });

        ok(required);
      }
      catch ( error ) {
        ko(error);
      }
    });
  }

  static fork (file) {
    let results = {};

    return props => {

      const p = new Promise((ok, ko) => {
        const child = child_process.fork(
          path.resolve(__dirname, '../bin/index.js'),
          [file]
        );

        child
          .on('error', ko)
          .on('exit', status => ok(results))
          .on('message', message => {

            message = JSON.parse(message);

            if ( 'redtea' in message ) {
              const { redtea } = message;

              results = redtea;
            }
          });
      });

      p.live = new EventEmitter();

      return p;
    }
  }

  static runFunctions (fns, props = {}, flags = []) {
    const live = new EventEmitter();

    const promise = sequencer(fns.map(fn => () => new Promise((ok, ko) => {
      const test = fn();

      test.live
        .on('error', live.emit.bind(live, 'error'))
        .on('test', live.emit.bind(live, 'test'))
        .on('passed', live.emit.bind(live, 'passed'))
        .on('failed', live.emit.bind(live, 'failed'));

      test.then(ok, ko);
    })));

    promise.live = live;

    return promise;
  }
}

export default Bin;
