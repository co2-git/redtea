#!/usr/bin/env node


'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

var _child_process = require('child_process');

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _libSequencer = require('../lib/sequencer');

var _libSequencer2 = _interopRequireDefault(_libSequencer);

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

process.title = 'redtea';

var tests = 0,
    passed = 0,
    failed = 0;
var begin = Date.now();

console.log('redtea v'.red.underline + _packageJson2['default'].version.toString().red.underline, 'pid:', process.pid);

var files = [];

var dir = process.argv[2] || 'test';

if (!/^\//.test(dir)) {
  dir = _path3['default'].join(process.cwd(), dir);
}

var done = false;

var runningTests = true;

process.on('exit', function () {
  if (!done && runningTests) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', '                 TEST FAILED   (EXIT)                     '.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
  // else {
  //   if ( process.send ) {
  //     process.send('redtea.done');
  //   }
  // }
});

if (process.send) {
  process.send(JSON.stringify({ redtea: true }));
}

var cliProps = {};

var flags = [];

process.argv.filter(function (arg, index) {
  return index > 2;
}).filter(function (arg) {
  return (/=/.test(arg)
  );
}).forEach(function (arg) {
  var bits = arg.split('=');
  cliProps[bits[0]] = bits[1];
});

process.argv.filter(function (arg, index) {
  return index > 2;
}).filter(function (arg) {
  return (/^--/.test(arg)
  );
}).forEach(function (arg) {
  flags.push(arg.replace(/^--/, ''));
});

switch (process.argv[2]) {
  case '-v':
    done = true;
    runningTests = false;
    process.exit(0);
}

_fsExtra2['default'].walk(dir).on('error', function (error) {
  console.log('scan dir error'.yellow);

  if (error.stack) {
    console.log(error.stack.yellow);
  } else {
    console.log(error);
  }
}).on('data', function (file) {
  if (file.stats.isFile()) {
    (function () {
      var _path = file.path.split(_path3['default'].sep);

      var _dir = dir.split(_path3['default'].sep);

      _path = _path.filter(function (p, index) {
        return index >= _dir.length;
      });

      if (_path.every(function (p) {
        return !/^\./.test(p);
      })) {
        files.push(file.path);
      }
    })();
  }
}).on('end', function () {
  (0, _libSequencer2['default'])(files.map(function (file, index) {
    if (flags.indexOf('fork') > -1) {
      return function (props) {
        var locals = {};

        return (0, _2['default'])('Forking test ' + _path3['default'].basename(file), function (it) {

          it('should fork', function () {
            return new _Promise(function (ok, ko) {

              console.log(__filename, [file]);

              locals.fork = (0, _child_process.fork)(__filename, [file]);

              var listen = function listen(message) {};

              locals.fork.on('error', ko).on('message', function (message) {

                message = JSON.parse(message);

                if (message.redtea) {
                  if (message.redtea === true) {
                    ok();
                  }
                }
              });
            });
          });

          it('should emit ok', function () {
            return new _Promise(function (ok, ko) {

              locals.fork.on('message', function (message) {
                message = JSON.parse(message);

                if (message.redtea) {
                  if (message.redtea.stats) {
                    tests += message.redtea.stats.tests;
                    passed += message.redtea.stats.passed;
                    failed += message.redtea.stats.failed;

                    if (message.redtea.stats.failed) {
                      return ko(new Error('Fork failed with ' + message.redtea.stats.failed + ' errors'));
                    } else {
                      ok();
                    }
                  }
                }
              }).on('exit', function (status) {
                if (!status) {
                  ok();
                }
              });
            });
          });
        });
      };
    } else {
      return require(file);
    }
  }).map(function (test, index) {
    return function (props) {
      return new _Promise(function (ok, ko) {
        // console.log({ test : files[index] })
        try {
          if (typeof test !== 'function') {
            return ko(new Error('Test ' + files[index] + ' must be a function'));
          }

          var promise = test(props);

          if (typeof promise.then !== 'function') {
            console.log(typeof promise);
            if (typeof promise === 'function') {
              promise = promise(_2['default']);
            } else {
              return ko(new Error('Test ' + files[index] + ' must be a promise'));
            }
          }

          promise.then(function (results) {
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
  }), cliProps).then(function () {
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

    process.send(JSON.stringify({ redtea: { stats: { tests: tests, passed: passed, failed: failed } } }));

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

    done = true;

    process.send(JSON.stringify({ redtea: { stats: { tests: tests, passed: passed, failed: failed } } }));

    process.exit(1);
  });
});