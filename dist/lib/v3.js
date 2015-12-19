'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function describe(label, story) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (this) {
    options = this;
  }

  // console.log('describe'.grey, label.grey.italic, options);

  return new Promise(function (ok, ko) {
    try {
      var _ret = (function () {
        var queue = options.queue || new _queue2['default']();

        options.tab = options.tab || '';

        var stats = options.stats || { tests: 1, passed: 0, failed: 0 };

        if (typeof story !== 'function') {
          return {
            v: ko(new Error('redtea > Can only describe functions'))
          };
        }

        var success = function success() {

          // if ( ! packed.nested ) {
          // stats.tests ++;
          stats.passed++;
          // }

          if (options.callbacks) {
            options.callbacks[0]();
          }

          if (!packed.nested) {
            console.log(' ', packed.tab + '✔'.green.bold, packed.label.grey, packed.id.toString().grey);
          }

          // console.log('ok stats', packed.label, stats);

          process.nextTick(function () {
            if (stats.passed + stats.failed === stats.tests) {
              ok(stats);
            }
          });
        };

        var failure = function failure(error) {
          // if ( ! packed.nested ) {
          // stats.tests ++;
          stats.failed++;
          // }

          if (options.callbacks) {
            options.callbacks[1]();
          }

          // console.log('ko stats', packed.label, stats);

          console.log(' ', packed.tab, '✖'.red.bold, packed.label.red, packed.id.toString().grey);

          if (error.stack) {
            console.log(error.stack.yellow);
          } else {
            console.log(error);
          }

          process.nextTick(function () {
            if (stats.passed + stats.failed === stats.tests) {
              ok(stats);
            }
          });
        };

        var packed = {
          tab: options.tab,
          callbacks: options.callbacks,
          label: label,
          nested: false,
          stats: stats,
          success: success,
          error: failure
        };

        packed.story = function () {
          return new Promise(function (ok, ko) {
            try {
              var tell = story(function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                packed.nested = true;

                stats.tests++;

                return describe.apply(Object.assign({}, { tab: options.tab + '|_'.grey }, { parent: packed.id }, { callbacks: [success, failure] }, { queue: queue }), args);
              });

              if (packed.nested) {
                console.log('  ' + options.tab + label.bgBlue);
              }

              if (tell instanceof Promise) {
                tell.then(ok, ko);
              } else {
                ok();
              }
            } catch (error) {
              ko(error);
            }
          });
        };

        if ('parent' in options) {
          packed.parent = options.parent;
        }

        queue.push(packed);
      })();

      if (typeof _ret === 'object') return _ret.v;
    } catch (error) {
      ko(error);
    }
  });
}

exports['default'] = describe;
module.exports = exports['default'];