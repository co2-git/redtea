#!/usr/bin/env node
// @flow

import colors from 'colors';
import _ from 'lodash';
import sequencer from 'promise-sequencer';
import format from '../lib/format';
import fetch from '../lib/fetch';
import packageJSON from '../../package.json';
import {Is} from '../lib/is';

function overthrow(error: Error) {
  console.log(colors.yellow(error.stack));
  process.exit(8);
}

// For Unix use: pkill redtea
process.title = 'redtea';

console.log(colors.red.bold(`redtea v${packageJSON.version}`));

// the test
let over: boolean = false;

process.on('exit', () => {
  if (!over) {
    const margin = pad(' ', 16);
    console.log('  ', colors.bgRed(pad(' ', 52)));
    console.log('  ', colors.bgRed.bold(
      `${margin}TEST FAILED   (EXIT)${margin}`)
    );
    console.log('  ', colors.bgRed(pad(' ', 52)));
  }
});

let tests = 0;
let passed = 0;
let failed = 0;
let done = 0;
let skipped = 0;
let tab = '';

function runAll(...functions: Array<Function>) {
  let cursor = 0;
  function runOne() {
    if (functions[cursor]) {
      functions[cursor]()
        .on('batch', (label: string) => {
          console.log(tab, colors.bgBlue(label));
          tab += '  ';
        })
        .on('describe', (subject: string, options: Array<Object>) => {
          let label;
          const as = _.find(options, 'as');
          if (as) {
            label = as.as;
          } else {
            label = format(subject);
          }
          console.log(tab, label);
        })
        .on('passed', (passedResult: Is) => {
          tests++;
          passed++;
          console.log(
            tab,
            '  ',
            colors.green.bold('√'),
            colors.grey('is' + passedResult.label.split('is')[1])
          );
        })
        .on('failed', (failedResult: Is) => {
          tests++;
          failed++;
          console.log(
            tab,
            '  ',
            colors.red.bold('×'),
            colors.red('is' + failedResult.label.split('is')[1])
          );
        })
        .on('_done', () => {
          // tab = tab.replace(/\s{2}$/, '');
        })
        .on('done', () => {
          tab = tab.replace(/\s\s$/, '');
          cursor++;
          runOne();
        });
    } else {
      over = true;
      console.log({tests, done, skipped, passed, failed});

      if (tests === passed) {
        console.log('  ', colors.bgGreen(pad(' ', 52)));
        console.log('  ', (colors.white.bgGreen.bold(
          pad(' ', 17),
          'ALL TESTS PASSED',
          pad(' ', 17),
        )));
        console.log('  ', colors.bgGreen(pad(' ', 52)));
      } else {
        console.log(colors.bgRed(pad(' ', 52)));
        console.log('  ', (colors.white.bgRed.bold(
          pad(' ', 17),
          failed + ' TEST FAILED',
          pad(' ', 17),
        )));
        console.log(colors.bgRed(pad(' ', 52)));
      }
    }
  }
  runOne();
}

function pad(character: string, times: number): string {
  return _.range(times).map((): string => character).join('');
}

const props = {};
const flags = [];
const files = [];

// Process command line arguments
process.argv
  .filter((arg: string, index: number): boolean => index > 1)
  .forEach((arg: string) => {
    if (/\=/.test(arg)) {
      const bits = arg.split('=');
      props[bits[0]] = bits[1];
    } else if (/^--/.test(arg)) {
      flags.push(arg.replace(/^--/, ''));
    } else {
      files.push(arg);
    }
  });

sequencer(
  (): Promise => fetch.getFiles(...files),
  (_files: Array<string>): Promise => fetch.getFunctions(_files, props, flags)
).then((results: Array<any>) => {
  try {
    const [, functions] = results;
    runAll(...functions);
  } catch (error) {
    overthrow(error);
  }
}).catch((error: Error) => {
  overthrow(error);
});
