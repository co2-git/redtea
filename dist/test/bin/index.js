'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _child_process = require('child_process');

var _events = require('events');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _package = require('../../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exec(cmd) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var emitter = new _events.EventEmitter();
  var bits = cmd.split(/\s+/);
  var entry = bits.shift();
  var ps = (0, _child_process.spawn)(entry, bits, options);

  var stdout = '';
  var stderr = '';

  ps.on('error', function (error) {
    emitter.emit('error', error);
  }).on('exit', function (status) {
    process.stdin.unpipe(ps.stdin);
    process.stdin.end();
    emitter.emit('status', status, stdout, stderr);
  });

  ps.stdout.on('data', function (data) {
    stdout += data.toString();
  });
  ps.stderr.on('data', function (data) {
    stderr += data.toString();
  });

  return emitter;
}

(0, _run2.default)('cli', [{
  label: 'Print version (`redtea --version`)',
  promise: function promise() {
    return new Promise(function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
        var emitter;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                try {
                  emitter = exec('node dist/bin/index --version');

                  emitter.on('status', function (status, stdout, stderr) {
                    resolve({ status: status, stdout: stdout, stderr: stderr });
                  });
                } catch (error) {
                  reject(error);
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
  },
  assert: function assert(results) {
    return [results.stdout.trim() === 'redtea v' + _package2.default.version, results.status === 0];
  }
}, {
  label: 'Exec a test file',
  promise: function promise() {
    return new Promise(function (resolve, reject) {
      try {
        var emitter = exec('node dist/bin/index dist/test/tests/value.js');
        emitter.on('status', function (status, stdout, stderr) {
          resolve({ status: status, stdout: stdout, stderr: stderr });
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  assert: function assert(results) {
    var lines = results.stdout.trim().split(/\n/);
    return [results.status === 0, _lodash2.default.last(lines) === 'Tests passed!'];
  }
}]);