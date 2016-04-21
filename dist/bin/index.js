#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
//  weak

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _bin = require('../lib/bin');

var _bin2 = _interopRequireDefault(_bin);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var package_json = _package2.default;

function printTime(time) {
  var duration = '';

  if (time < 1000) {
    duration = time + 'ms';
  } else if (time < 1000 * 60) {
    duration = time / 1000 + 's';
  } else if (time < 1000 * (60 * 60)) {
    duration = time / 1000 / 60 + 'minutes';
  }

  return { time: time, duration: duration };
}

function pad(character, times) {
  var str = '';
  for (var iterate = 0; iterate < times; iterate++) {
    str += character;
  }
  return str;
}

// the test
var done = false;

// For Unix use: pkill redtea
process.title = 'redtea';

process.on('exit', function () {
  if (!done) {
    var margin = pad(' ', 16);
    console.log('  ', _safe2.default.bgRed(pad(' ', 52)));
    console.log('  ', _safe2.default.bgRed.bold(margin + 'TEST FAILED   (EXIT)' + margin));
    console.log('  ', _safe2.default.bgRed(pad(' ', 52)));
  }
});

console.log(_safe2.default.red.bold('redtea v' + package_json.version));

if (process.argv[2] === '-v') {
  done = true;
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

(0, _promiseSequencer2.default)(function () {
  return _bin2.default.getFiles.apply(_bin2.default, files);
}, function (_files) {
  return _bin2.default.getFunctions(_files, props, flags);
}).then(function (results) {
  var _results = _slicedToArray(results, 2);

  var functions = _results[1];

  var runner = _bin2.default.runFunctions(functions, props, flags);
  runner.live.on('error', function (error) {
    return console.log(error.stack);
  }).on('failed', function (test) {
    if (!test.children.length) {
      var _printTime = printTime(test.time);

      var duration = _printTime.duration;
      var time = _printTime.time;


      if (time < 50) {
        duration = _safe2.default.white('(' + duration + ')');
      } else if (time < 100) {
        duration = _safe2.default.yellow('(' + duration + ')');
      } else {
        duration = _safe2.default.red('(' + duration + ')');
      }

      var tab = '';

      if (test.parents.length) {
        for (var cursor = 0; cursor < test.parents.length; cursor++) {
          tab += _safe2.default.grey('|_');
        }
      }

      console.log(tab + _safe2.default.bold.red('✖'), _safe2.default.red(test.label), duration);

      var lines = test.error.stack.split(/\n/).map(function (line) {
        return line.yellow;
      }).join('\n' + tab);

      console.log(tab + ' ' + lines);
    }
  }).on('passed', function (test) {
    if (!test.children.length) {
      var _printTime2 = printTime(test.time);

      var duration = _printTime2.duration;
      var time = _printTime2.time;


      if (time < 50) {
        duration = _safe2.default.white('(' + duration + ')');
      } else if (time < 100) {
        duration = _safe2.default.yellow('(' + duration + ')');
      } else {
        duration = _safe2.default.red('(' + duration + ')');
      }

      var tab = '';

      if (test.parents.length) {
        for (var cursor = 0; cursor < test.parents.length; cursor++) {
          tab += _safe2.default.grey('|_');
        }
      }
      console.log(tab + _safe2.default.bold.green('✔'), test.label.grey, duration);
    }
  }).on('test', function (test) {
    if (test.children.length) {
      var tab = '';

      if (test.parents.length) {
        for (var cursor = 0; cursor < test.parents.length; cursor++) {
          tab += _safe2.default.grey('|_');
        }
      }

      console.log(tab + '↘', _safe2.default.bold(test.label));
    }
  });

  runner.then(function (run_results) {
    done = true;
    var tests = [],
        passed = [],
        failed = [],
        time = 0;
    run_results.forEach(function (result) {
      tests = tests.concat(result.children.filter(function (test) {
        return !test.children.length;
      }));
      passed = passed.concat(result.passed.filter(function (test) {
        return !test.children.length;
      }));
      failed = failed.concat(result.failed.filter(function (test) {
        return !test.children.length;
      }));
      time += result.time;
    });

    var _printTime3 = printTime(time);

    var duration = _printTime3.duration;


    var test_num = tests.length + ' tests in ' + duration;
    var passed_num = passed.length + ' passed';
    var failed_num = failed.length + ' failed';

    console.log();
    console.log('   ', pad('-', 44));
    console.log('  ', _safe2.default.bold(test_num), _safe2.default.green(passed_num), _safe2.default.red(failed_num));
    console.log('  ', pad('-', 44));

    if (failed.length) {
      console.log('  ', _safe2.default.bgRed(pad(' ', 44)));
      console.log('  ', _safe2.default.bgRed.bold(pad(' ', 16) + 'TEST FAILED   (x' + failed.length + ')' + pad(' ', 20)));
      console.log('  ', _safe2.default.bgRed(pad(' ', 44)));
      console.log();

      failed.forEach(function (test, index) {
        var parents = test.parents.map(function (parent) {
          return _safe2.default.bgRed(' ' + parent.label + ' ');
        }).join('\n');

        if (parents) {
          parents += '\n';
        }

        console.log(_safe2.default.bgRed.bold(index + 1 + '/' + failed.length), '--', parents, _safe2.default.red.bold(test.label), _safe2.default.red.italic('failed after ' + printTime(test.time).duration));

        console.log(test.error.stack.yellow);

        console.log();
        console.log();
      });
    } else {
      console.log('  ', _safe2.default.bgGreen(pad(' ', 48)));
      console.log('  ', _safe2.default.bgGreen.bold(pad(' ', 16) + 'ALL TESTS PASSED' + pad(' ', 16)));
      console.log('  ', _safe2.default.bgGreen(pad(' ', 48)));
    }

    if (typeof process.send === 'function') {
      process.send(JSON.stringify({ redtea: {
          children: tests.map(function (test) {
            return {
              label: test.label,
              status: test.status,
              time: test.time,
              id: test.id,
              children: test.children.map(function (child) {
                return {
                  label: child.label,
                  status: child.status,
                  time: child.time,
                  id: child.id
                };
              })
            };
          }),
          passed: passed.map(function (test) {
            return {
              label: test.label,
              status: test.status,
              time: test.time,
              id: test.id,
              children: test.children.map(function (child) {
                return {
                  label: child.label,
                  status: child.status,
                  time: child.time,
                  id: child.id
                };
              })
            };
          }),
          failed: failed.map(function (test) {
            return {
              label: test.label,
              status: test.status,
              time: test.time,
              id: test.id,
              error: {
                name: test.error.name,
                message: test.error.message,
                stack: test.error.stack
              },
              children: test.children.map(function (child) {
                return {
                  label: child.label,
                  status: child.status,
                  time: child.time,
                  id: child.id
                };
              }),
              parents: test.parents.map(function (parent) {
                return {
                  label: parent.label,
                  status: parent.status,
                  time: parent.time,
                  id: parent.id
                };
              })
            };
          }),
          time: time
        } }));
    }

    process.exit(failed.length);
  }).catch(function (error) {
    return console.log(error.stack);
  });
}).catch(function (error) {
  return console.log(error.stack);
});