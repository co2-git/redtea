// @flow
import 'babel-polyfill';
import 'colors';
import _ from 'lodash';
import type from '../lib/type';
import format from '../lib/format';
import getFiles from '../lib/getFiles';
import getFunctions from '../lib/getFunctions';

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

let tab = '';
let tests = 0;
let passed = 0;
let failed = 0;

function init(): Promise<null> {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const _files = await getFiles(...files);
      const functions = getFunctions(_files);

      run(...functions);

      console.log();
      console.log(`${tests} tests, ${passed} passed, ${failed} failed`);
      console.log();

      if (failed) {
        reject(new Error('Tests are failing'));
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function run(...testers: Array<Function>) {
  tab += '  ';
  for (const tester of testers) {
    const result = tester();
    if (result.constructor.name === 'Batch') {
      console.log(tab.black, result.label.underline);
      run(...result.tests);
    } else if (result.constructor.name === 'Describe') {
      console.log(
        tab.black,
        result.label.italic,
        format(result.that).grey
      );
      for (const attr in result.assert) {
        if (attr === 'value') {
          tests++;
          if (_.isEqual(result.that, result.assert.value)) {
            passed++;
            console.log(`${tab}  `.black, '√ Value matches'.green);
          } else {
            failed++;
            console.log(`${tab}  `.black, '✖ Value does not match'.bold.red);
            console.log(`${tab}  `.black,
              (`Expected value <${format(result.that)}> to match ` +
                `<${format(result.assert.value)}>`).yellow
            );
          }
        } else if (attr === 'type') {
          tests++;
          if (type(result.that, result.type)) {
            passed++;
            console.log(`${tab}    `, '√');
          }
        }
      }
    }
    console.log();
  }
  tab = tab.replace(/ {2}$/, '');
}

init()
  .then(() => console.log())
  .catch(error => {
    throw error;
  });
