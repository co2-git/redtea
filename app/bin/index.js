#! /usr/bin/env node
// @flow
import 'babel-polyfill';
import init from '../lib/cli';
import pkg from '../../package.json';

if (process.argv[2] === '--version') {
  console.log('redtea v' + pkg.version);
  process.exit(0);
}

const props: {[key: string]: string} = {};
const flags: string[] = [];
const files: string[] = [];

// Process command line arguments
process.argv
  .filter((arg: string, index: number): boolean => index > 1)
  .forEach((arg: string) => {
    if (/\=/.test(arg)) {
      const bits: string[] = arg.split('=');
      props[bits[0]] = bits[1];
    } else if (/^--/.test(arg)) {
      flags.push(arg.replace(/^--/, ''));
    } else {
      files.push(arg);
    }
  });

init(...files);
