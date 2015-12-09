#!/usr/bin/env node


'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _libSequencer = require('../lib/sequencer');

var _libSequencer2 = _interopRequireDefault(_libSequencer);

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var tests = 0,
    passed = 0,
    failed = 0;
var begin = Date.now();

console.log('redtea v'.red.underline + _packageJson2['default'].version.toString().red.underline);

var files = [];

var dir = _path2['default'].join(process.cwd(), process.argv[2] || 'test');

var done = false;

process.on('exit', function () {
  if (!done) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', '                  TEST FAILED   (EXIT)                      '.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
});

_fsExtra2['default'].walk(dir).on('data', function (file) {
  if (file.stats.isFile()) {
    files.push(file.path);
  }
}).on('end', function () {
  (0, _libSequencer2['default'])(files.map(function (file) {
    return require(file);
  }).map(function (test) {
    return function (props) {
      return new Promise(function (ok, ko) {
        try {
          test(props).then(function (results) {
            tests += results.tests;
            passed += results.passed;
            failed += results.failed;
            ok();
          }, ko);
        } catch (error) {
          ko(error);
        }
      });
    };
  })).then(function () {
    var time = Date.now() - begin;

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
    console.log('  ', (tests + ' tests in ' + duration).bold, (passed + ' passed').green, (failed + ' failed').red);
    console.log('   ----------------------------------------------------------');

    if (failed) {
      console.log('  ', '                                                          '.bgRed);
      console.log('  ', ('                  TEST FAILED   (x' + failed + ')                      ').bgRed.bold);
      console.log('  ', '                                                          '.bgRed);
    } else {
      console.log('  ', '                                                          '.bgGreen);
      console.log('  ', '                     ALL TESTS PASSED                     '.bgGreen.bold);
      console.log('  ', '                                                          '.bgGreen);
    }

    done = true;

    process.exit(failed);
  }, function (error) {
    if (error.stack) {
      console.log(error.stack.yellow);
    } else {
      console.log(error);
    }
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', '                  TEST FAILED                             '.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);

    done = true;

    process.exit(1);
  });
});