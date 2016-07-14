#! /usr/bin/env node
// @flow
import 'babel-polyfill';
import colors from 'colors';
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

async function init(): Promise<null> {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const _files = await getFiles(...files);
      const functions = getFunctions(_files);

      await run(...functions);

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

function __batch(result): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(colors.black(tab), result.label.underline);
      await run(...result.tests);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function walk(that, assertions, not = false) {
  if (('value') in assertions) {
    tests++;
    const isEqual = _.isEqual(that, assertions.value);
    const valid = not ? !isEqual : isEqual;
    if (valid) {
      passed++;
      console.log(
        colors.black(`${tab}  `),
        colors.green('√ Value is', format(assertions.value))
      );
    } else {
      failed++;
      console.log(
        colors.black(`${tab}  `),
        colors.bold.red('✖ Value does not match'),
      );
      console.log(colors.black(`${tab}  `), colors.yellow(
        (`Expected value <${format(that)}> to match ` +
          `<${format(assertions.value)}>`)
      ));
    }
  }

  if (('type' in assertions)) {
    tests++;
    const isType = type(that, type);
    const valid = not ? !isType : isType;
    if (valid) {
      passed++;
      console.log(
        `${tab}    `,
        not ?
          colors.green('√ Type is not', format(assertions.type)) :
          colors.green('√ Type matches', format(assertions.type)),
      );
    } else {
      failed++;
      console.log(
        colors.black(`${tab}  `),
        colors.bold.red('✖ Type does not match'),
      );
      console.log(colors.black(`${tab}  `), colors.yellow(
        (`Expected type <${format(that.constructor)}> to match ` +
          `<${format(assertions.type)}>`)
      ));
    }
  }

  if (('not' in assertions)) {
    walk(that, assertions.not, true);
  }
}

function __describe(result) {
  console.log(
    colors.black(tab),
    result.label.italic,
    colors.grey(format(result.that)),
  );
  walk(result.that, result.assertions);
}

function __promise(result): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const that = await result.promise();
      __describe({
        ...result,
        that,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function run(...testers: Array<Function>): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      tab += '  ';
      for (const tester of testers) {
        const result = tester();
        if (result.constructor.name === 'Batch') {
          await __batch(result);
        } else if (result.constructor.name === 'Describe') {
          __describe(result);
        } else if (result.constructor.name === '_Promise') {
          await __promise(result);
        }
        console.log();
      }
      tab = tab.replace(/ {2}$/, '');
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

init()
  .then(() => console.log('Tests finished'))
  .catch(error => {
    console.log(error.stack.yellow);
    process.exit(1);
  });
