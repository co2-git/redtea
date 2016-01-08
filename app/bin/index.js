#!/usr/bin/env node

'use strict';

import fs               from 'fs-extra';
import path             from 'path';
import { fork }         from 'child_process';
import colors           from 'colors';
import describe         from '..';
import sequencer        from '../lib/sequencer';
import packageJSON      from '../../package.json';

process.title = 'redtea';

let tests = 0, passed = 0, failed = 0;
const begin = Date.now();

console.log('redtea v'.red.underline + packageJSON.version.toString().red.underline, 'pid:', process.pid);

const files = [];

let dir = ( process.argv[2] || 'test' );

if ( ! /^\//.test(dir) ) {
  dir = path.join(process.cwd(), dir);
}

let done = false;

let runningTests = true;

process.on('exit', () => {
  if ( ! done && runningTests ) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', `                 TEST FAILED   (EXIT)                     `.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
  // else {
  //   if ( process.send ) {
  //     process.send('redtea.done');
  //   }
  // }
});

if ( process.send ) {
  process.send(JSON.stringify({ redtea : true }));
}

const cliProps = {};

const flags = [];

process.argv
  .filter((arg, index) => index > 2)
  .filter(arg => /=/.test(arg))
  .forEach(arg => {
    const bits = arg.split('=');
    cliProps[bits[0]] = bits[1];
  });

process.argv
  .filter((arg, index) => index > 2)
  .filter(arg => /^--/.test(arg))
  .forEach(arg => {
    flags.push(arg.replace(/^--/, ''));
  });

switch ( process.argv[2] ) {
  case '-v':
    done = true;
    runningTests = false;
    process.exit(0);
}

fs.walk(dir)
  .on('error', error => {
    console.log('scan dir error'.yellow);

    if ( error.stack ) {
      console.log(error.stack.yellow);
    }
    else {
      console.log(error);
    }
  })
  .on('data', file => {
    if ( file.stats.isFile() ) {
      let _path = file.path.split(path.sep);

      const _dir = dir.split(path.sep);

      _path = _path.filter((p, index) => index >= _dir.length);

      if ( _path.every(p => ! /^\./.test(p)) ) {
        files.push(file.path);
      }
    }
  })
  .on('end', () => {
    sequencer(
      files
        .map((file, index) => {
          if ( flags.indexOf('fork') > -1 ) {
            return (props) => {
              const locals = {};

              return describe(`Forking test ${path.basename(file)}`, it => {

                it('should fork', () => new Promise((ok, ko) => {

                  console.log(__filename, [file])

                  locals.fork = fork(__filename, [file]);

                  const listen = message => {

                  };

                  locals.fork

                    .on('error', ko)

                    .on('message', message => {

                      message = JSON.parse(message);

                      if ( message.redtea ) {
                        if ( message.redtea === true ) {
                          ok();
                        }
                      }
                    });

                }));

                it('should emit ok', () => new Promise((ok, ko) => {

                  locals.fork
                    .on('message', message => {
                      message = JSON.parse(message);

                      if ( message.redtea ) {
                        if ( message.redtea.stats ) {
                          tests += message.redtea.stats.tests;
                          passed += message.redtea.stats.passed;
                          failed += message.redtea.stats.failed;

                          if ( message.redtea.stats.failed ) {
                            return ko(new Error(`Fork failed with ${message.redtea.stats.failed} errors`));
                          }
                          else {
                            ok();
                          }
                        }
                      }
                    })
                    .on('exit', status => {
                      if ( ! status ) {
                        ok();
                      }
                    });

                }));

              });
            };
          }
          else {
            return require(file);
          }
        })
        .map((test, index) => props => new Promise((ok, ko) => {
          // console.log({ test : files[index] })
          try {
            if ( typeof test !== 'function' ) {
              return ko(new Error(`Test ${files[index]} must be a function`));
            }

            let promise = test(props);

            if ( typeof promise.then !== 'function' ) {
              console.log(typeof promise);
              if ( typeof promise === 'function' ) {
                promise = promise(describe);
              }
              else {
                return ko(new Error(`Test ${files[index]} must be a promise`));
              }

            }

            promise.then(results => {
              tests += results.tests;
              passed += results.passed;
              failed += results.failed;
              ok();
            }, ko);
          }
          catch ( error ) {
            ko(error);
          }
        })),

      cliProps
    )
    .then(
      () => {
        const time = Date.now() - begin;

        let duration = '';

        if ( time < 1000 ) {
          duration = time + 'ms';
        }

        else if ( time < (1000 * 60) ) {
          duration = time / 1000 + 's';
        }

        else if ( time < (1000 * (60 * 60)) ) {
          duration = time / 1000 / 60 + 'minutes';
        }

        console.log();
        console.log('   ----------------------------------------------------------');
        console.log('  ', `${tests} tests in ${duration}`.bold, `${passed} passed`.green, `${failed} failed`.red);
        console.log('   ----------------------------------------------------------');

        if ( failed ) {
          console.log('  ', '                                                          '.bgRed);
          console.log('  ', `                  TEST FAILED   (x${failed})                      `.bgRed.bold);
          console.log('  ', '                                                          '.bgRed);
        }

        else {
          console.log('  ', '                                                          '.bgGreen);
          console.log('  ', `                     ALL TESTS PASSED                     `.bgGreen.bold);
          console.log('  ', '                                                          '.bgGreen);
        }

        done = true;

        process.send(JSON.stringify({ redtea : { stats : { tests, passed, failed } }}));

        process.exit(failed);
      },
      error => {
        if ( error.stack ) {
          console.log(error.stack.yellow);
        }
        else {
          console.log(error);
        }
        console.log('  ', '                                                          '.bgRed);
        console.log('  ', `                  TEST FAILED                             `.bgRed.bold);
        console.log('  ', '                                                          '.bgRed);

        const time = Date.now() - begin;

        let duration = '';

        if ( time < 1000 ) {
          duration = time + 'ms';
        }

        else if ( time < (1000 * 60) ) {
          duration = time / 1000 + 's';
        }

        else if ( time < (1000 * (60 * 60)) ) {
          duration = time / 1000 / 60 + 'minutes';
        }

        console.log();
        console.log('   ----------------------------------------------------------');
        console.log('  ', `${tests} tests in ${duration}`.bold, `${passed} passed`.green, `${failed} failed`.red);
        console.log('   ----------------------------------------------------------');

        done = true;

        process.send(JSON.stringify({ redtea : { stats : { tests, passed, failed } }}));

        process.exit(1);
      }
    );
  });
