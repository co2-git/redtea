#! /usr/bin/env node
'use strict';

require('babel-polyfill');

var _cli = require('../lib/cli');

var _cli2 = _interopRequireDefault(_cli);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.argv[2] === '--version') {
  console.log('redtea v' + _package2.default.version);
  process.exit(0);
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

_cli2.default.apply(undefined, files);