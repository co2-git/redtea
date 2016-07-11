'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

require('babel-polyfill');

require('colors');

var _events = require('events');

var _it = require('./lib/it');

var _it2 = _interopRequireDefault(_it);

var _is = require('./lib/is');

var _Listener = require('./lib/Listener');

var _Listener2 = _interopRequireDefault(_Listener);

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

function emit(emitter) {
  for (var _len = arguments.length, messages = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    messages[_key - 1] = arguments[_key];
  }

  process.nextTick(function () {
    return emitter.emit.apply(emitter, messages);
  });
}

function run(emitter, subject) {
  var results = [];

  for (var _len2 = arguments.length, describers = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    describers[_key2 - 2] = arguments[_key2];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = runAll.apply(undefined, [subject].concat(describers))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var result = _step.value;

      results.push(result);
      if (result.passed) {
        emit(emitter, 'passed', subject, result);
      } else {
        emit(emitter, 'failed', subject, result);
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

  emit(emitter, 'done');
}

function describe(subject) {
  for (var _len3 = arguments.length, describers = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    describers[_key3 - 1] = arguments[_key3];
  }

  var emitter = new _events.EventEmitter();

  emit(emitter, 'describe', subject);

  if (subject instanceof Promise) {
    subject.then(function (resolved) {
      return run.apply(undefined, [emitter, resolved].concat(describers));
    }).catch(function (rejected) {
      return run.apply(undefined, [emitter, rejected].concat(describers));
    });
  } else if (subject instanceof _events.EventEmitter) {
    describe.emitter.apply(describe, [emitter, subject].concat(describers));
  } else {
    run.apply(undefined, [emitter, subject].concat(describers));
  }

  return emitter;
}

describe.emitter = function (emitter, subject) {
  for (var _len4 = arguments.length, describers = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    describers[_key4 - 2] = arguments[_key4];
  }

  var functions = describers.filter(function (describer) {
    return typeof describer === 'function';
  });
  var options = describers.filter(function (describer) {
    return (typeof describer === 'undefined' ? 'undefined' : _typeof(describer)) === 'object';
  });
  var listeners = functions.map(function (describer) {
    return describer(subject);
  });
  var timers = [];
  var _listeners = [];
  listeners.forEach(function (listener, index) {
    if (listener instanceof _Listener2.default) {
      var listenerOptions = listener.checkers.map(function (checker) {
        return (typeof checker === 'undefined' ? 'undefined' : _typeof(checker)) === 'object';
      });
      _listeners[index] = function () {
        clearTimeout(timers[index]);
        if (!listener.checkers.length) {
          emitter.emit('passed', subject, new _is.Is('it is emitting "' + listener.event + '"', subject, {
            passed: true,
            event: listener.event
          }));
        }
      };
      timers[index] = setTimeout(function () {
        emitter.emit('failed', subject, new _is.Is('it is emitting "' + listener.event + '"', subject, {
          passed: false,
          event: listener.event
        }));
        subject.removeListener(listener.event, _listeners[index]);
      }, listenerOptions.wait || 2500);
      subject.once(listener.event, _listeners[index]);
    } else {
      if (listener.passed) {
        emit(emitter, 'passed', listener);
      }
    }
  });
};

function sequence(emitter) {
  for (var _len5 = arguments.length, functions = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    functions[_key5 - 1] = arguments[_key5];
  }

  var _marked2 = [runAllDescribers].map(regeneratorRuntime.mark);

  var cursor = 0;

  function next() {
    cursor++;
    runner.next();
  }

  function runOneDescriber() {
    functions[cursor]().on('error', function (error) {
      console.log(error.stack.red);
      next();
    }).on('describe', emitter.emit.bind(emitter, 'describe')).on('passed', emitter.emit.bind(emitter, 'passed')).on('failed', emitter.emit.bind(emitter, 'failed')).on('done', function () {
      console.log('done'.bgGreen);
      console.log();
      console.log();
      next();
    });
  }

  function runAllDescribers() {
    return regeneratorRuntime.wrap(function runAllDescribers$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!functions[cursor]) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 1;
            _context2.next = 4;
            return runOneDescriber(cursor);

          case 4:
            _context2.next = 10;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](1);
            _context2.next = 10;
            return new _is.Is('Caught error', _context2.t0, {
              passed: false,
              error: _context2.t0
            });

          case 10:
            _context2.next = 0;
            break;

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2[0], this, [[1, 6]]);
  }

  var runner = runAllDescribers();
  runner.next();
}

function batch(label) {
  var emitter = new _events.EventEmitter();

  console.log(label.bold.underline);

  for (var _len6 = arguments.length, describers = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    describers[_key6 - 1] = arguments[_key6];
  }

  sequence.apply(undefined, [emitter].concat(describers));

  return emitter;
}

function throwError() {
  throw new Error('OOO');
}

var emitter = new _events.EventEmitter();

setTimeout(function () {
  return emitter.emit('foo');
}, 2000);

// sequence(
//   () => describe(1, it.is(1)),
//   () => describe(new Promise((resolve) => resolve(22)), it.is.a.number),
//   () => describe('foo', it.is.a.number),
//   () => describe(throwError, it.is.throwing()),
//   () => describe(emitter, it.is.an.emitter),
// );

batch('Test', function () {
  return describe(1, _it2.default.is(1));
}, function () {
  return describe(new Promise(function (resolve) {
    return resolve(22);
  }), _it2.default.is.a.number);
}, function () {
  return describe('foo', _it2.default.is.a.number);
}, function () {
  return describe(throwError, _it2.default.is.throwing());
}, function () {
  return describe(emitter, _it2.default.is.an.emitter);
}).on('describe', function (subject) {
  return console.log(subject);
}).on('passed', function (subject, result) {
  return console.log('passed'.green, result);
}).on('failed', function (subject, result) {
  return console.log('failed'.yellow, result);
});