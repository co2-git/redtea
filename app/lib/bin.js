// @flow weak

import {EventEmitter} from 'events';
import fs from 'fs-extra';
import path from 'path';
import child_process from 'child_process';
import 'colors';
import sequencer from 'promise-sequencer';
import describe from '..';

function flattenArray(arr: Array<any>): Array<any> {
  return arr.reduce(
    (reduced: Array<any>, item: any): Array<any> => {
      if (Array.isArray(item)) {
        reduced.push(...flattenArray(item));
      } else {
        reduced.push(item);
      }
      return reduced;
    },
    []
  );
}

class Bin extends EventEmitter {

  static getFiles(...files: Array<any>): Promise {
    return new Promise((resolve, reject) => {
      Promise
        .all(files.map((file: string): Promise => this.getFile(file)))
        .then(results => {
          const flattened_results = flattenArray(results).reduce(
            (unique, result) => {
              if (unique.indexOf(result) === -1) {
                unique.push(result);
              }
              return unique;
            },
            []
          );
          resolve(flattened_results);
        })
        .catch(reject);
    });
  }

  static getFile(file: string): Promise {
    const formatted_file = /^\//.test(file) ?
      file : path.join(process.cwd(), file);

    return sequencer.pipe(
      () => sequencer.promisify(fs.stat, [formatted_file]),
      stat => new Promise((resolve, reject) => {
        if (stat.isDirectory()) {
          this.scandir(file)
            .then(files => {
              this.getFiles(...files).then(resolve, reject);
            })
            .catch(reject);
        } else {
          resolve(file);
        }
      })
    );
  }

  static scandir(dir: string): Promise {
    return new Promise((resolve, reject) => {
      const files = [];
      fs.walk(dir)
        .on('error', reject)
        .on('data', (file: Object) => {
          if (file.path.replace(/\/$/, '') !== dir.replace(/\/$/, '')) {
            files.push(file.path);
          }
        })
        .on('end', () => resolve(files));
    });
  }

  static getFunctions(
    files: Array<string>,
    props: Object = {},
    flags: Array<string> = []
  ): Promise {
    return new Promise((resolve, reject) => {
      try {
        const required: Array<Function> = files.map(file => {
          if (flags.indexOf('fork') > -1) {
            return this.fork(file);
          }
          let absoluteFile;

          if (/^\//.test(file)) {
            absoluteFile = file;
          } else {
            absoluteFile = path.join(process.cwd(), file);
          }

          let fn = require(absoluteFile);

          if (typeof fn.default === 'function') {
            fn = fn.default;
          }

          if (typeof fn !== 'function') {
            let serialization = typeof fn;

            try {
              serialization += ' ' + JSON.stringify(fn);
            } catch (error) {
              console.warn('redtea> could not serialize');
            }

            return () => describe(
              'redtea imports file ' + file,
              it => {
                it('File should export a function', () => {
                  throw new Error('Expected a function, got ' + serialization);
                });
              }
            );
          }
          return fn;
        });

        resolve(required);
      } catch (error) {
        reject(error);
      }
    });
  }

  static fork(file: string): Function {
    let results = {};

    return () => {
      const promise = sequencer(
        () => new Promise((resolve, reject) => {
          const child = child_process.fork(
            path.resolve(__dirname, '../bin/index.js'),
            [file]
          );

          child
            .on('error', reject)
            .on('exit', () => resolve(results))
            .on('message', message => {
              const parsed_message = JSON.parse(message);

              if ('redtea' in parsed_message) {
                const {redtea} = parsed_message;

                results = redtea;
              }
            });
        })
      );
      promise.live = new EventEmitter();
      return promise;
    };
  }

  static runFunctions(fns: Array<Function>): Promise {
    const live = new EventEmitter();

    const eachFunction = (fn: Function): Function => () =>
      new Promise((resolve, reject) => {
        const test = fn();

        test.live
          .on('error', live.emit.bind(live, 'error'))
          .on('test', live.emit.bind(live, 'test'))
          .on('passed', live.emit.bind(live, 'passed'))
          .on('failed', live.emit.bind(live, 'failed'));

        test.then(resolve, reject);
      });

    const promise = sequencer(fns.map(eachFunction));

    promise.live = live;

    return promise;
  }
}

export default Bin;
