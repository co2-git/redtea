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

function __eval(
    that: any,
    expected: any,
    not: boolean,
    test: boolean,
    okLabel: string,
    koLabel: string,
    _tab: string
  ) {
  tests++;
  const valid = not ? !test : test;
  if (valid) {
    passed++;
    console.log(
      `${_tab}    `,
      not ?
        colors.green(`√ ${koLabel}`, format(expected)) :
        colors.green(`√ ${okLabel}`, format(expected)),
    );
  } else {
    failed++;
    console.log(
      colors.black(`${_tab}  `),
      not ?
      colors.bold.red(`✖ ${koLabel}`, format(expected)) :
      colors.bold.red(`✖ ${okLabel}`, format(expected)),
    );
  }
}

function walk(that, assertions, not = false) {
  if (('value') in assertions) {
    __eval(
      that,
      assertions.value,
      not,
      _.isEqual(that, assertions.value),
      'Value is',
      'Value is not',
      tab,
    );
  }

  if (('type' in assertions)) {
    __eval(
      that,
      assertions.type,
      not,
      type(that, assertions.type),
      'Type is',
      'Type is not',
      tab,
    );
  }

  if (('not' in assertions)) {
    walk(that, assertions.not, true);
  }

  if (('has' in assertions)) {
    if (assertions.has instanceof RegExp || _.isString(that)) {
      const regex = assertions.has instanceof RegExp ?
        assertions.has : new RegExp(assertions.has);
      __eval(
        that,
        assertions.has,
        not,
        regex.test(that),
        'String matches',
        'String does not match',
        tab,
      );
    } else if (_.isArray(that)) {
      __eval(
        that,
        assertions.has,
        not,
        _.some(that, (item) => _.isEqual(item, assertions.has)),
        'Array includes',
        'Array does not include',
        tab,
      );
    } else if (_.isObject(that)) {
      if (_.isString(assertions.has)) {
        __eval(
          that,
          assertions.has,
          not,
          _.has(that, assertions.has),
          'Object has property(ies)',
          'Object does not have property(ies)',
          tab,
        );
      } else if (_.isArray(assertions.has)) {
        __eval(
          that,
          assertions.has,
          not,
          _.every(assertions.has, prop => _.matches(that, prop)),
          'Object matches',
          'Object does not match',
          tab,
        );
      } else if (_.isObject(assertions.has)) {
        __eval(
          that,
          assertions.has,
          not,
          _.matches(that, assertions.has),
          'Object matches',
          'Object does not match',
          tab,
        );
      }
    }
  }
}

function __describe(result) {
  console.log(
    colors.black(tab),
    result.label.italic,
    colors.grey(format(result.that)),
  );
  walk(result.that, result.assertions || result.assert);
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
