#!/usr/bin/bash

// @flow

import path from 'path';
import colors from 'colors';
import _ from 'lodash';
import sequencer from 'promise-sequencer';
import format from '../lib/format';

let tests = 0;
let passed = 0;
let failed = 0;

function pad(character: string, times: number): string {
  return _.range(times).map(() => character).join('');
}

function readResult(result: Object, tab: string = ''): void {
  console.log(tab, colors.cyan.bold(result.label));
  result.results.forEach(result2 => {
    // console.log(require('util').inspect(result2, { depth: null }));
    if (('subject' in result2)) {
      console.log(tab, '  ', colors.bold(format(result2.subject)));
      result2.results.forEach(result3 => {
        tests++;
        const symbol = result3.passed ? '√' : '×';
        const symbolColor = result3.passed ? 'green' : 'red';
        const labelColor = result3.passed ? 'grey' : 'red';
        if (result3.passed) {
          passed++;
        } else {
          failed++;
        }
        console.log(
          tab,
          '    ',
          colors[symbolColor].bold(symbol),
          colors[labelColor]('is' + result3.label.split('is')[1])
        );
      });
    } else if (('label' in result2)) {
      readResult(result2, tab + '  ');
    }
  });
}

const [, , file] = process.argv;

const test = require(path.join(process.cwd(), file)).default;

const testResults = [];

sequencer(test)
  .then(results => {
    testResults.push(...results);
  })
  .catch(error => {
    console.log({error});
    const err = _.pick(error, ['name', 'subject', 'value', 'type', 'message']);
    console.log(err, testResults);
    // testResults.push({
    //   subject,
    //
    // });
  })
  .then(() => {
    // console.log(require('util').inspect(testResults, { depth: null }));
    testResults.forEach(result => readResult(result));

    console.log();
    console.log({tests, passed});
    console.log();

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
      console.log(colors.bgRed(pad(' ', 52)));
    }
  });
