#!/usr/bin/env node

import colors from 'colors';
import Bin from '../lib/bin';
import packageJSON from '../../package.json';

// For Unix use: pkill redtea

process.title = 'redtea';

process.on('exit', () => {
  if ( typeof exec === 'undefined' || !exec.done ) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', `                 TEST FAILED   (EXIT)                     `.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
});

console.log(`redtea v${packageJSON.version}`.red.bold)

const props = {};

const flags = [];

const files = [];

process.argv
  .filter((arg, index) => index > 1)

  .forEach((arg, index) => {

    if ( /=/.test(arg) ) {
      const bits = arg.split('=');
      props[bits[0]] = bits[1];
    }

    else if ( /^--/.test(arg) ) {
      flags.push(arg.replace(/^--/, ''));
    }

    else {
      files.push(arg);
    }

  });

const exec = new Bin(files, props, flags)

  .on('error', error => console.log(error.stack))

  .on('message', message => console.log({ message }))

  .on('passed', () => {

    const time = exec.stopsAt - exec.startsAt;

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
    console.log('  ', `${exec.tests} tests in ${duration}`.bold, `${exec.passed} passed`.green, `${exec.failed} failed`.red);
    console.log('   ----------------------------------------------------------');

    if ( exec.failed ) {
      console.log('  ', '                                                          '.bgRed);
      console.log('  ', `                  TEST FAILED   (x${exec.failed})                      `.bgRed.bold);
      console.log('  ', '                                                          '.bgRed);
    }

    else {
      console.log('  ', '                                                          '.bgGreen);
      console.log('  ', `                     ALL TESTS PASSED                     `.bgGreen.bold);
      console.log('  ', '                                                          '.bgGreen);
    }

    if ( process.send ) {
      process.send(JSON.stringify({ redtea : exec }));
    }

    process.exit(exec.failed);

  })

  .on('failed', error => {

    if ( error.stack ) {
      console.log(error.stack.yellow);
    }
    else {
      console.log(error);
    }

    console.log('  ', '                                                          '.bgRed);
    console.log('  ', `                  TEST FAILED                             `.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);

    const time = exec.stopsAt - exec.startsAt;

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
    console.log('  ', `${exec.tests} tests in ${duration}`.bold, `${exec.passed} passed`.green, `${exec.failed} failed`.red);
    console.log('   ----------------------------------------------------------');

    if ( process.send ) {
      process.send(JSON.stringify({ redtea : exec }));
    }


    process.exit(1);

  });
