'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _events = require('events');

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _getFiles = require('./getFiles');

var _getFiles2 = _interopRequireDefault(_getFiles);

var _getFunctions = require('./getFunctions');

var _getFunctions2 = _interopRequireDefault(_getFunctions);

var _run = require('./all/run');

var _run2 = _interopRequireDefault(_run);

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

var _is = require('./batch/is');

var _is2 = _interopRequireDefault(_is);

var _is3 = require('./describe/is');

var _is4 = _interopRequireDefault(_is3);

var _is5 = require('./emitter/is');

var _is6 = _interopRequireDefault(_is5);

var _is7 = require('./promise/is');

var _is8 = _interopRequireDefault(_is7);

var _events2 = require('./all/events');

var RUN_EVENTS = _interopRequireWildcard(_events2);

var _events3 = require('./batch/events');

var BATCH_EVENTS = _interopRequireWildcard(_events3);

var _events4 = require('./describe/events');

var DESCRIBE_EVENTS = _interopRequireWildcard(_events4);

var _events5 = require('./promise/events');

var PROMISE_EVENTS = _interopRequireWildcard(_events5);

var _events6 = require('./emitter/events');

var EMITTER_EVENTS = _interopRequireWildcard(_events6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var json = {
  version: _package2.default.version,
  done: false,
  status: null,
  tests: 0,
  passed: 0,
  failed: 0,
  start: new Date(),
  all: []
};


process.on('exit', function () {
  if (!json.done) {
    console.log(_colors2.default.red('✖ Tests could not complete!'));
    json.status = 8;
    json.end = new Date();
    json.error = {
      name: 'UncaughtError',
      message: 'Uncaught error',
      stack: []
    };
    console.log(_colors2.default.grey(JSON.stringify(json, null, 2)));
    process.exit(8);
  }
});

function close() {
  json.done = true;
  console.log();
  console.log(json.tests + ' test(s) ' + json.passed + ' passed ' + json.failed + ' failed');
  console.log();
  console.log(json.tests === json.passed ? _colors2.default.bgGreen.bold.white('Tests passed!') : _colors2.default.bgRed.bold.white('Tests failed'));
  console.log();
  if (json.tests !== json.passed) {
    json.status = 1;
    json.end = new Date();
    console.log(_colors2.default.grey(JSON.stringify(json, null, 2)));
    process.exit(1);
  }
}

function printTab(tab) {
  var bg = arguments.length <= 1 || arguments[1] === undefined ? 'bgBlack' : arguments[1];

  var print = '';
  for (var cursor = 0; cursor < tab; cursor++) {
    print += '  ';
  }
  return _colors2.default.bold[bg](print);
}

function onResult(test, report) {
  var tab = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  json.tests++;
  if (report.valid) {
    json.passed++;
  } else {
    json.failed++;
  }
  console.log(printTab(tab) + _colors2.default.bold.white[report.valid ? 'green' : 'bgRed'](report.valid ? ' √ ' : ' ✖ '), _colors2.default[report.valid ? 'grey' : 'yellow'](report.message));
  if (report.error) {
    console.log(_colors2.default.yellow(report.error.stack));
  }
}

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var _arguments = arguments,
        _this = this;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
              var functions, emitter, tab;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      json.cmd = process.argv.join(' ');
                      json.os = {
                        arch: _os2.default.arch(),
                        platform: _os2.default.platform(),
                        release: _os2.default.release(),
                        type: _os2.default.type()
                      };
                      _context.next = 4;
                      return _getFiles2.default.apply(undefined, _arguments);

                    case 4:
                      json.files = _context.sent;
                      functions = (0, _getFunctions2.default)(json.files);
                      emitter = _run2.default.apply(undefined, (0, _toConsumableArray3.default)(functions));
                      tab = 0;


                      emitter.on(RUN_EVENTS.ERROR, function (error) {
                        console.log(_colors2.default.yellow(error.stack));
                        json.tests++;
                        json.failed++;
                        close();
                        json.status = 8;
                        json.end = new Date();
                        console.log(_colors2.default.grey(JSON.stringify(json, null, 2)));
                        process.exit(8);
                      }).on(RUN_EVENTS.END, function () {
                        json.status = 0;
                        json.end = new Date();
                        console.log(_colors2.default.grey(JSON.stringify(json, null, 2)));
                        console.log();
                        close();
                        process.exit(0);
                      }).on(RUN_EVENTS.START, function () {
                        // console.log(tab + 'start');
                      }).on(BATCH_EVENTS.START, function (batch) {
                        console.log();
                        console.log(printTab(tab), _colors2.default.underline(batch.label));
                        console.log();
                        tab++;
                      }).on(BATCH_EVENTS.END, function () {
                        tab--;
                      }).on(BATCH_EVENTS.ERROR, function (batch, error) {
                        console.log('batch error', error.stack);
                      }).on(DESCRIBE_EVENTS.START, function (test) {
                        console.log(printTab(tab), _colors2.default.white(test.label), _colors2.default.italic.grey((0, _format2.default)(test.that)));
                        tab++;
                      }).on(DESCRIBE_EVENTS.END, function () {
                        tab--;
                      }).on(DESCRIBE_EVENTS.RESULT, function (describe, report) {
                        onResult(describe, report, tab);
                      }).on(PROMISE_EVENTS.RESULT, function (promise, report) {
                        onResult(promise, report, tab);
                      }).on(PROMISE_EVENTS.START, function (promise) {
                        console.log(printTab(tab), _colors2.default.white(promise.label));
                        tab++;
                      }).on(PROMISE_EVENTS.PROMISE, function (promise, resolved) {
                        console.log(printTab(tab), (0, _format2.default)(resolved));
                      }).on(PROMISE_EVENTS.END, function () {
                        tab--;
                      }).on(PROMISE_EVENTS.ERROR, function (result, error) {
                        json.tests++;
                        json.failed++;
                        console.log(printTab(tab), _colors2.default.white.bold.bgRed(' ✖ '), _colors2.default.red(result.label), _colors2.default.white.bold.bgRed(error.message));
                        console.log(_colors2.default.yellow(error.stack));
                      }).on(EMITTER_EVENTS.ERROR, function (_emitter, error) {
                        json.tests++;
                        json.failed++;
                        console.log(printTab(tab), _colors2.default.white.bold.bgRed(' ✖ '), _colors2.default.yellow(error.message));
                      }).on(EMITTER_EVENTS.START, function (_emitter) {
                        console.log(printTab(tab), _colors2.default.white(_emitter.label), _colors2.default.italic((0, _format2.default)(_emitter.that)));
                        tab++;
                      }).on(EMITTER_EVENTS.END, function () {
                        tab--;
                      }).on(EMITTER_EVENTS.START_EVENT, function (event) {
                        for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                          messages[_key - 1] = arguments[_key];
                        }

                        json.tests++;
                        json.passed++;
                        console.log(printTab(tab), _colors2.default.green.bold(' √ ') + ('event "' + event + '"'), _colors2.default.grey((0, _format2.default)(messages).replace(/^array /, '')));
                        tab++;
                      }).on(EMITTER_EVENTS.EVENT_MESSAGE, function (message) {
                        console.log(printTab(tab), _colors2.default.grey((0, _format2.default)(message)));
                      }).on(EMITTER_EVENTS.END_EVENT, function () {
                        tab--;
                      }).on(EMITTER_EVENTS.RESULT, function (_emitter, report) {
                        onResult(_emitter, report, tab);
                      });

                    case 9:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            })(), 't0', 2);

          case 2:
            _context2.next = 12;
            break;

          case 4:
            _context2.prev = 4;
            _context2.t1 = _context2['catch'](0);

            console.log(_colors2.default.yellow(_context2.t1.stack));
            json.status = 8;
            json.end = new Date();
            json.error = {
              name: _context2.t1.name,
              message: _context2.t1.message,
              stack: _context2.t1.stack
            };
            console.log(_colors2.default.grey(JSON.stringify(json, null, 2)));
            process.exit(8);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 4]]);
  }));

  function init(_x3) {
    return _ref.apply(this, arguments);
  }

  return init;
}();