'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function sequencer(pipeline, locals, afterEach) {
  if (pipeline === undefined) pipeline = [];
  if (locals === undefined) locals = {};

  return new Promise(function (ok, ko) {
    try {
      (function () {
        var cursor = 0;

        var run = function run() {
          try {
            if (pipeline[cursor]) {
              pipeline[cursor](locals).then(function () {
                try {
                  if (afterEach) {
                    afterEach();
                  }
                  cursor++;
                  run();
                } catch (error) {
                  ko(error);
                }
              }, ko);
            } else {
              ok(locals);
            }
          } catch (error) {
            ko(error);
          }
        };

        run();
      })();
    } catch (error) {
      ko(error);
    }
  });
}

exports['default'] = sequencer;
module.exports = exports['default'];