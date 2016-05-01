#!/usr/bin/bash
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _format = require('../lib/format');

var _format2 = _interopRequireDefault(_format);

var _fetch = require('../lib/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _is = require('../lib/is');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function overthrow(error) {
  console.log(_colors2.default.yellow(error.stack));
  process.exit(8);
}

// For Unix use: pkill redtea
process.title = 'redtea';

console.log(_colors2.default.red.bold('redtea v' + _package2.default.version));

// the test
var over = false;

process.on('exit', function () {
  if (!over) {
    var margin = pad(' ', 16);
    console.log('  ', _colors2.default.bgRed(pad(' ', 52)));
    console.log('  ', _colors2.default.bgRed.bold(margin + 'TEST FAILED   (EXIT)' + margin));
    console.log('  ', _colors2.default.bgRed(pad(' ', 52)));
  }
});

var tests = 0;
var passed = 0;
var failed = 0;
var done = 0;
var skipped = 0;
var tab = '';

function runAll() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  var cursor = 0;
  function runOne() {
    if (functions[cursor]) {
      functions[cursor]().on('batch', function (label) {
        console.log(tab, _colors2.default.bgBlue(label));
        tab += '  ';
      }).on('describe', function (subject, options) {
        var label = void 0;
        var as = _lodash2.default.find(options, 'as');
        if (as) {
          label = as.as;
        } else {
          label = (0, _format2.default)(subject);
        }
        console.log(tab, label);
      }).on('passed', function (passedResult) {
        tests++;
        passed++;
        console.log(tab, '  ', _colors2.default.green.bold('√'), _colors2.default.grey('is' + passedResult.label.split('is')[1]));
      }).on('failed', function (failedResult) {
        tests++;
        failed++;
        console.log(tab, '  ', _colors2.default.red.bold('×'), _colors2.default.red('is' + failedResult.label.split('is')[1]));
      }).on('_done', function () {
        tab = tab.replace(/\s\s$/, '');
      }).on('done', function () {
        tab = tab.replace(/\s\s$/, '');
        cursor++;
        runOne();
      });
    } else {
      over = true;
      console.log({ tests: tests, done: done, skipped: skipped, passed: passed, failed: failed });

      if (tests === passed) {
        console.log('  ', _colors2.default.bgGreen(pad(' ', 52)));
        console.log('  ', _colors2.default.white.bgGreen.bold(pad(' ', 17), 'ALL TESTS PASSED', pad(' ', 17)));
        console.log('  ', _colors2.default.bgGreen(pad(' ', 52)));
      } else {
        console.log(_colors2.default.bgRed(pad(' ', 52)));
        console.log('  ', _colors2.default.white.bgRed.bold(pad(' ', 17), failed + ' TEST FAILED', pad(' ', 17)));
        console.log(_colors2.default.bgRed(pad(' ', 52)));
      }
    }
  }
  runOne();
}

function pad(character, times) {
  return _lodash2.default.range(times).map(function () {
    return character;
  }).join('');
}

var props = {};
var flags = [];
var files = [];

// Process command line arguments
process.argv.filter(function (arg, index) {
  return index > 1;
}).forEach(function (arg) {
  if (/\=/.test(arg)) {
    var bits = arg.split('=');
    props[bits[0]] = bits[1];
  } else if (/^--/.test(arg)) {
    flags.push(arg.replace(/^--/, ''));
  } else {
    files.push(arg);
  }
});

(0, _promiseSequencer2.default)(function () {
  return _fetch2.default.getFiles.apply(_fetch2.default, files);
}, function (_files) {
  return _fetch2.default.getFunctions(_files, props, flags);
}).then(function (results) {
  try {
    var _results = _slicedToArray(results, 2);

    var functions = _results[1];

    runAll.apply(undefined, _toConsumableArray(functions));
  } catch (error) {
    overthrow(error);
  }
}).catch(function (error) {
  overthrow(error);
});