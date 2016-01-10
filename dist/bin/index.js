#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _libBin = require('../lib/bin');

var _libBin2 = _interopRequireDefault(_libBin);

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

// the test
var exec;

// For Unix use: pkill redtea

process.title = 'redtea';

process.on('exit', function () {
  if (typeof exec === 'undefined' || !exec.done) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', '                 TEST FAILED   (EXIT)                     '.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
});

console.log(('redtea v' + _packageJson2['default'].version).red.bold);

if (process.argv[2] === '-v') {
  exec = { done: true };
  process.exit(0);
}

var props = {};

var flags = [];

var files = [];

process.argv.filter(function (arg, index) {
  return index > 1;
}).forEach(function (arg, index) {

  if (/=/.test(arg)) {
    var bits = arg.split('=');
    props[bits[0]] = bits[1];
  } else if (/^--/.test(arg)) {
    flags.push(arg.replace(/^--/, ''));
  } else {
    files.push(arg);
  }
});

exec = new _libBin2['default'](files, props, flags).on('error', function (error) {
  return console.log(error.stack);
}).on('message', function (message) {
  return console.log({ message: message });
}).on('passed', function () {

  var time = exec.stopsAt - exec.startsAt;

  var duration = '';

  if (time < 1000) {
    duration = time + 'ms';
  } else if (time < 1000 * 60) {
    duration = time / 1000 + 's';
  } else if (time < 1000 * (60 * 60)) {
    duration = time / 1000 / 60 + 'minutes';
  }

  console.log();
  console.log('   ----------------------------------------------------------');
  console.log('  ', (exec.tests + ' tests in ' + duration).bold, (exec.passed + ' passed').green, (exec.failed + ' failed').red);
  console.log('   ----------------------------------------------------------');

  if (exec.failed) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', ('                  TEST FAILED   (x' + exec.failed + ')                      ').bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  } else {
    console.log('  ', '                                                          '.bgGreen);
    console.log('  ', '                     ALL TESTS PASSED                     '.bgGreen.bold);
    console.log('  ', '                                                          '.bgGreen);
  }

  if (process.send) {
    process.send(JSON.stringify({ redtea: exec }));
  }

  process.exit(exec.failed);
}).on('failed', function (error) {

  if (error.stack) {
    console.log(error.stack.yellow);
  } else {
    console.log(error);
  }

  console.log('  ', '                                                          '.bgRed);
  console.log('  ', '                  TEST FAILED                             '.bgRed.bold);
  console.log('  ', '                                                          '.bgRed);

  var time = exec.stopsAt - exec.startsAt;

  var duration = '';

  if (time < 1000) {
    duration = time + 'ms';
  } else if (time < 1000 * 60) {
    duration = time / 1000 + 's';
  } else if (time < 1000 * (60 * 60)) {
    duration = time / 1000 / 60 + 'minutes';
  }

  console.log();
  console.log('   ----------------------------------------------------------');
  console.log('  ', (exec.tests + ' tests in ' + duration).bold, (exec.passed + ' passed').green, (exec.failed + ' failed').red);
  console.log('   ----------------------------------------------------------');

  if (process.send) {
    process.send(JSON.stringify({ redtea: exec }));
  }

  process.exit(1);
});