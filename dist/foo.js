'use strict';

require('babel-polyfill');

var _events = require('events');

var _it = require('./lib/it');

var _it2 = _interopRequireDefault(_it);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [runAll].map(regeneratorRuntime.mark);

function runAll(subject) {
  var cursor,
      _args = arguments;
  return regeneratorRuntime.wrap(function runAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cursor = 0;

        case 1:
          if (!(_args.length <= cursor + 1 ? undefined : _args[cursor + 1])) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return runOne(subject, _args.length <= cursor + 1 ? undefined : _args[cursor + 1]);

        case 4:
          cursor++;
          _context.next = 1;
          break;

        case 7:
          return _context.abrupt('return', true);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function runOne(subject, describer) {
  return describer(subject);
}

function describe(subject) {
  for (var _len = arguments.length, describers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    describers[_key - 1] = arguments[_key];
  }

  var emitter = new _events.EventEmitter();

  function emit() {
    for (var _len2 = arguments.length, messages = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      messages[_key2] = arguments[_key2];
    }

    process.nextTick(function () {
      return emitter.emit.apply(emitter, messages);
    });
  }

  function run(_subject) {
    var results = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = runAll.apply(undefined, [_subject].concat(describers))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var result = _step.value;

        results.push(result);
        if (result.passed) {
          emit('passed', _subject, result);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  emit('describe', subject);

  if (subject instanceof Promise) {
    subject.then(run, run);
  } else {
    run(subject);
  }

  return emitter;
}

function wrap(fn) {
  fn().on('error', function (error) {
    return console.log(error.stack);
  }).on('describe', function (subject) {
    return console.log('describe', subject);
  }).on('passed', function (subject, result) {
    return console.log('passed', result);
  });
}

function throwError() {
  throw new Error('OOO');
}

wrap(function () {
  return describe(throwError, _it2.default.is.throwing());
});