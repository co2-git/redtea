'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function it(label, promise) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var stories = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

  if (typeof promise === 'function') {
    var _stories$push;

    stories.push((_stories$push = {}, _defineProperty(_stories$push, label, promise), _defineProperty(_stories$push, 'options', options), _stories$push));
  } else if (Array.isArray(promise)) {
    var _stories$push2;

    (function () {
      var _stories = [];
      promise.map(function (promise) {
        return promise(function (label, promise) {
          return it(label, promise, options || {}, _stories);
        });
      });
      stories.push((_stories$push2 = {}, _defineProperty(_stories$push2, label, _stories), _defineProperty(_stories$push2, 'options', options), _stories$push2));
    })();
  } else if (promise instanceof Describer) {
    var _stories$push3;

    stories.push((_stories$push3 = {}, _defineProperty(_stories$push3, label, promise), _defineProperty(_stories$push3, 'options', options), _stories$push3));
  }
}

function describe(descriptor, stories) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  return new Promise(function (ok, ko) {
    try {
      (function () {

        if (typeof stories === 'function') {
          (function () {
            var _stories = [];
            stories(function (label, promise) {
              var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
              return it(label, promise, options, _stories);
            });
            stories = _stories;
          })();
        }

        var tab = options.tab || '';
        var tests = 0;
        var passed = 0;
        var failed = 0;
        var begin = Date.now();

        if (!tab) {
          console.log();
          console.log('  ' + descriptor.blue.bold);
        } else {
          console.log('  ' + tab + descriptor.bold);
        }

        var cursor = 0;

        var run = function run() {
          if (stories[cursor]) {
            try {
              (function () {
                if (typeof stories[cursor] !== 'object') {
                  if (typeof stories[cursor] !== 'function') {
                    throw new Error('Must be an object');
                  }
                }

                var start = Date.now();

                var promise = undefined;

                var isNested = false;

                var storyDescriptor = Object.keys(stories[cursor])[0];

                /**
                 *  {
                 *    timeout : <Number> - milliseconds
                 *  }
                 */

                var storyOptions = stories[cursor].options || {};

                var story = stories[cursor][storyDescriptor];

                if (story instanceof Describer) {
                  story = story.func();
                }

                if (Array.isArray(story)) {
                  promise = describe(storyDescriptor, story, { tab: tab + '|_'.grey });

                  isNested = true;
                } else {
                  promise = new Promise(function (ok, ko) {

                    var fulfilled = null;

                    if ('timeout' in storyOptions) {
                      setTimeout(function () {
                        if (fulfilled === null) {
                          ko(new Error('Could not fulfill test, script timed out after ' + storyOptions.timeout + ' milliseconds'));
                        }
                      }, storyOptions.timeout);
                    }

                    story(function () {
                      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                      }

                      fulfilled = true;
                      ok.apply(null, args);
                    }, function () {
                      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                      }

                      fulfilled = false;
                      ko.apply(null, args);
                    });
                  });
                }

                promise.then(function (p) {
                  try {
                    if (!isNested) {
                      tests++;
                      passed++;

                      var end = Date.now() - start;

                      var time = undefined;

                      if (end < 50) {
                        time = ('(' + end.toString() + ' ms)').white;
                      } else if (end < 250) {
                        time = ('(' + end.toString() + ' ms)').yellow;
                      } else {
                        time = ('(' + end.toString() + ' ms)').red;
                      }

                      console.log('  ' + tab + '|_'.grey + '✔'.green.bold + ' ' + storyDescriptor.grey + ' ' + time);
                    } else {
                      tests += p.tests;
                      passed += p.passed;
                      failed += p.failed;
                    }

                    cursor++;
                    run();
                  } catch (error) {
                    ko(error);
                  }
                }, function (error) {
                  try {
                    tests++;
                    failed++;

                    var end = Date.now() - start;

                    var time = undefined;

                    if (end < 50) {
                      time = ('(' + end.toString() + ' ms)').grey;
                    } else if (end < 250) {
                      time = ('(' + end.toString() + ' ms)').yellow;
                    } else {
                      time = ('(' + end.toString() + ' ms)').red;
                    }

                    console.log('  ' + tab + '  ' + '✖'.red.bold + ' ' + storyDescriptor.red.italic + ' ' + time);

                    if (error.stack) {
                      console.log(error.stack.yellow);
                    } else {
                      console.log(error);
                    }

                    cursor++;
                    run();
                  } catch (error) {
                    ko(error);
                  }
                });
              })();
            } catch (error) {
              ko(error);
            }
          } else {
            ok({ tests: tests, passed: passed, failed: failed, time: Date.now() - begin, props: props });
          }
        };

        run();
      })();
    } catch (error) {
      ko(error);
    }
  });
}

var Describer = function Describer(func) {
  _classCallCheck(this, Describer);

  this.func = function () {
    var stories = [];
    func()(function (label, promise) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      return it(label, promise, options, stories);
    });
    return stories;
  };
};

describe.Describer = Describer;

describe.imply = function (fn) {
  return new Describer(fn);
};
describe.use = function (fn) {
  return new Describer(fn);
};

exports['default'] = describe;
module.exports = exports['default'];