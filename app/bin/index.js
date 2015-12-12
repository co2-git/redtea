#!/usr/bin/env node

'use strict';

import fs               from 'fs-extra';
import path             from 'path';
import colors           from 'colors';
import sequencer        from '../lib/sequencer';
import packageJSON      from '../../package.json';

process.title = 'redtea';

let tests = 0, passed = 0, failed = 0;
const begin = Date.now();

console.log('redtea v'.red.underline + packageJSON.version.toString().red.underline);

const files = [];

const dir = path.join(process.cwd(), process.argv[2] || 'test');

let done = false;

process.on('exit', () => {
  if ( ! done ) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', `                 TEST FAILED   (EXIT)                     `.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
});

fs.walk(dir)
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
        .map(file => require(file))
        .map(test => props => new Promise((ok, ko) => {
          try {
            test(props).then(results => {
              tests += results.tests;
              passed += results.passed;
              failed += results.failed;
              ok();
            }, ko);
          }
          catch ( error ) {
            ko(error);
          }
        }))
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

        done = true;

        process.exit(1);
      }
    );
  });
