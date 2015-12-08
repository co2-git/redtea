#!/usr/bin/env node

'use strict';

import fs from 'fs';
import path from 'path';
import colors from 'colors';
import sequencer from '../lib/sequencer';
import packageJSON from '../../package.json';

let tests = 0, passed = 0, failed = 0;
const begin = Date.now();

console.log('redtea v'.red.underline + packageJSON.version.toString().red.underline);

const dir = path.join(process.cwd(), process.argv[2] || 'test');

fs.readdir(dir, (error, files) => {
  if ( error ) {
    console.log(error.stack.yellow);
    process.exit(1);
  }

  sequencer(
    files
      .filter(file => /\.js$/.test(file))
      .map(file => require(`${dir}/${file}`))
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
      process.exit(1);
    }
  );
});
