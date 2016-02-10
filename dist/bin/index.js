#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _sequencer = require('sequencer');

var _sequencer2 = _interopRequireDefault(_sequencer);

var _bin = require('../lib/bin');

var _bin2 = _interopRequireDefault(_bin);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log({ sequencer: _sequencer2.default });

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

// the test
var done = false;

// For Unix use: pkill redtea

process.title = 'redtea';

process.on('exit', function () {
  if (!done) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', '                 TEST FAILED   (EXIT)                     '.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
});

console.log(('redtea v' + _package2.default.version).red.bold);

if (process.argv[2] === '-v') {
  done = true;
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

(0, _sequencer2.default)(function () {
  return _bin2.default.getFiles.apply(_bin2.default, files);
}, function (files) {
  return _bin2.default.getFunctions(files, props, flags);
}).then(function (results) {
  var _results = _slicedToArray(results, 2);

  var files = _results[0];
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
        duration = ('(' + duration + ')').white;
      } else if (time < 100) {
        duration = ('(' + duration + ')').yellow;
      } else {
        duration = ('(' + duration + ')').red;
      }

      var tab = '';

      if (test.parents.length) {
        for (var i = 0; i < test.parents.length; i++) {
          tab += '|_'.grey;
        }
      }

      console.log(tab + '✖'.bold.red, test.label.red, duration);

      var lines = test.error.stack.split(/\n/).map(function (l) {
        return l.yellow;
      }).join('\n' + tab);

      console.log(tab + ' ' + lines);
    }
  }).on('passed', function (test) {
    if (!test.children.length) {
      var _printTime2 = printTime(test.time);

      var duration = _printTime2.duration;
      var time = _printTime2.time;


      if (time < 50) {
        duration = ('(' + duration + ')').white;
      } else if (time < 100) {
        duration = ('(' + duration + ')').yellow;
      } else {
        duration = ('(' + duration + ')').red;
      }

      var tab = '';

      if (test.parents.length) {
        for (var i = 0; i < test.parents.length; i++) {
          tab += '|_'.grey;
        }
      }
      console.log(tab + '✔'.bold.green, test.label.grey, duration);
    }
  }).on('test', function (test) {
    if (test.children.length) {
      var tab = '';

      if (test.parents.length) {
        for (var i = 0; i < test.parents.length; i++) {
          tab += '|_'.grey;
        }
      }

      console.log(tab + '↘', test.label.bold);
    }
  });

  runner.then(function (results) {
    done = true;

    var tests = [],
        passed = [],
        failed = [],
        time = 0;

    results.forEach(function (result) {
      tests = tests.concat(result.children.filter(function (t) {
        return !t.children.length;
      }));
      passed = passed.concat(result.passed.filter(function (t) {
        return !t.children.length;
      }));
      failed = failed.concat(result.failed.filter(function (t) {
        return !t.children.length;
      }));
      time += result.time;
    });

    var _printTime3 = printTime(time);

    var duration = _printTime3.duration;


    console.log();
    console.log('   ----------------------------------------------------------');
    console.log('  ', (tests.length + ' tests in ' + duration).bold, (passed.length + ' passed').green, (failed.length + ' failed').red);
    console.log('   ----------------------------------------------------------');

    if (failed.length) {
      console.log('  ', '                                                          '.bgRed);
      console.log('  ', ('                  TEST FAILED   (x' + failed.length + ')                      ').bgRed.bold);
      console.log('  ', '                                                          '.bgRed);

      console.log();

      failed.forEach(function (test, index) {
        var parents = test.parents.map(function (p) {
          return (' ' + p.label + ' ').bgRed;
        }).join('\n');

        if (parents) {
          parents += '\n';
        }

        console.log((index + 1 + '/' + failed.length).bgRed.bold, '--', parents, test.label.red.bold, ('failed after ' + printTime(test.time).duration).red.italic);

        console.log(test.error.stack.yellow);

        console.log();
        console.log();
      });
    } else {
      console.log('  ', '                                                          '.bgGreen);
      console.log('  ', '                     ALL TESTS PASSED                     '.bgGreen.bold);
      console.log('  ', '                                                          '.bgGreen);
    }

    if (process.send) {
      process.send(JSON.stringify({ redtea: {
          children: tests.map(function (t) {
            return {
              label: t.label, status: t.status, time: t.time, id: t.id,
              children: t.children.map(function (t) {
                return {
                  label: t.label, status: t.status, time: t.time, id: t.id
                };
              })
            };
          }),
          passed: passed.map(function (t) {
            return {
              label: t.label, status: t.status, time: t.time, id: t.id,
              children: t.children.map(function (t) {
                return {
                  label: t.label, status: t.status, time: t.time, id: t.id
                };
              })
            };
          }),
          failed: failed.map(function (t) {
            return {
              label: t.label, status: t.status, time: t.time, id: t.id,
              error: {
                name: t.error.name,
                message: t.error.message,
                stack: t.error.stack
              },
              children: t.children.map(function (t) {
                return {
                  label: t.label, status: t.status, time: t.time, id: t.id
                };
              }),
              parents: t.parents.map(function (t) {
                return {
                  label: t.label, status: t.status, time: t.time, id: t.id
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