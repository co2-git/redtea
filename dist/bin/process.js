'use strict';

var _chalk = require('./chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.title = 'redtea';
process.redtea = {
  complete: false,
  props: {},
  flags: [],
  files: [],
  tests: 0,
  passed: 0,
  failed: 0,
  skipped: 0
};
process.on('exit', function () {
  if (!process.redtea.complete) {
    (0, _chalk2.default)('TEST FAILED (EXIT)', 'error');
    console.log(process.redtea);
  }
});

process.argv.filter(function (arg, index) {
  return index > 1;
}).forEach(function (arg) {
  if (/\=/.test(arg)) {
    var bits = arg.split('=');
    process.redtea.props[bits[0]] = bits[1];
  } else if (/^--/.test(arg)) {
    process.redtea.flags.push(arg.replace(/^--/, ''));
  } else {
    process.redtea.files.push(arg);
  }
});