'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

_queue2['default'].on('success', function (story) {
  if (!story.nested) {
    console.log(' ', story.tab + '✔'.green.bold, story.label.grey, story.id.toString().grey);
  }
}).on('error', function (story, error) {
  console.log(story.tab, '✖'.red.bold, story.label.red, story.id.grey);
  if (error.stack) {
    console.log(error.stack.yellow);
  } else {
    console.log(error);
  }
});

function describe(label, _story) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (this) {
    options = this;
  }

  return new _Promise(function (ok, ko) {
    try {
      var _ret = (function () {
        options.tab = options.tab || '';

        var stats = options.stats || { tests: 0, passed: 0, failed: 0 };

        if (typeof _story !== 'function') {
          return {
            v: ko(new Error('redtea > Can only describe functions'))
          };
        }

        var packed = {
          tab: options.tab,
          label: label,
          nested: false,
          stats: stats,
          story: function story() {
            return new _Promise(function (ok, ko) {
              try {
                var tell = _story(function () {
                  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }

                  packed.nested = true;
                  return describe.apply(_Object$assign({}, { tab: options.tab + '|_'.grey }, { stats: stats }, { parent: packed.id }), args);
                });

                if (packed.nested) {
                  console.log('  ' + options.tab + label.bgBlue);
                }

                if (tell instanceof _Promise) {
                  tell.then(ok, ko);
                } else {
                  ok();
                }
              } catch (error) {
                ko(error);
              }
            });
          },
          success: function success() {
            if (!packed.nested) {
              // stats.tests ++;
              stats.passed++;
            }

            if (stats.passed + stats.failed === stats.tests) {
              process.nextTick(function () {
                return ok(stats);
              });
            }
          },
          error: function error() {
            if (!packed.nested) {
              // stats.tests ++;
              stats.failed++;
            }

            if (stats.passed + stats.failed === stats.tests) {
              process.nextTick(function () {
                return ok(stats);
              });
            }
          }
        };

        if ('parent' in options) {
          packed.parent = options.parent;
        }

        _queue2['default'].push(packed);
      })();

      if (typeof _ret === 'object') return _ret.v;
    } catch (error) {
      ko(error);
    }
  });
}

exports['default'] = describe;
module.exports = exports['default'];