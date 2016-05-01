'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.it = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.

// `describe` returns an emitter that will emit the following events:
// - "describe" (subject: any) this event is triggered to show test has begun
// - "done" (results: Array<Is>)

describe = describe;

var _events = require('events');

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function Listener(event, checkers) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  _classCallCheck(this, Listener);

  this.checkers = [];
  this.not = false;

  this.event = event;
  this.checkers = checkers;
  this.not = not;
};

function itIs(value) {
  return function (subject) {
    return (0, _is2.default)(subject, value);
  };
}

function itIsNot(value) {
  return function (subject) {
    return _is2.default.not(subject, value);
  };
}

function itIsA(type) {
  return function (subject) {
    return _is2.default.type(subject, type);
  };
}

function itIsNotA(value) {
  return function (subject) {
    return _is2.default.not.type(subject, value);
  };
}

function emits(event) {
  for (var _len = arguments.length, checkers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    checkers[_key - 1] = arguments[_key];
  }

  return function () {
    return new Listener(event, checkers);
  };
}

function doesNotEmit(event) {
  return function () {
    return new Listener(event, [], true);
  };
}

var it = exports.it = {
  is: itIs,
  emits: emits,
  does: {
    not: {
      emit: doesNotEmit
    }
  }
};

it.is.true = itIs(true);
it.is.false = itIs(false);
it.is.null = itIs(null);
it.is.undefined = itIs(undefined);

var aa = 'a';
it.is[aa] = itIsA;
it.is.an = itIsA;
it.is.a.string = itIsA(String);
it.is.a.number = itIsA(Number);
it.is.a.boolean = itIsA(Boolean);
it.is.a.date = itIsA(Date);
it.is.a.promise = itIsA(Promise);
it.is.a.regular = { expression: itIsA(RegExp) };
it.is.an.emitter = itIsA(_events.EventEmitter);
it.is.an.error = itIsA(Error);
it.is.an.object = itIsA(Object);
it.is.an.array = itIsA(Array);
it.is.not = itIsNot;
it.is.not[aa] = itIsNotA;
it.is.not.an = itIsNotA;
it.is.not.an.error = itIsNotA(Error);
it.is.not.a.string = itIsNotA(String);
it.is.not.a.number = itIsNotA(Number);
it.is.not.a.boolean = itIsNotA(Boolean);
it.is.not.an.object = itIsNotA(Object);
it.is.not.an.array = itIsNotA(Array);
it.is.not.an.emitter = itIsNotA(_events.EventEmitter);
it.is.not.a.promise = itIsNotA(Promise);
it.is.not.a.date = itIsNotA(Date);
it.is.not.a.regular = { expression: itIsNotA(RegExp) };function describe(subject) {
  for (var _len2 = arguments.length, describers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    describers[_key2 - 1] = arguments[_key2];
  }

  // The test emitter
  var emitter = new _events.EventEmitter();
  // The function to emit
  var emit = function emit(event) {
    for (var _len3 = arguments.length, messages = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      messages[_key3 - 1] = arguments[_key3];
    }

    return(
      // (running in next tick because that's the way emitters work but if we run
      //  the whole test in next tick, we might miss events in the current tick)
      process.nextTick(function () {
        emitter.emit.apply(emitter, [event].concat(messages));
      })
    );
  };
  // the function to run describers on a subject. Note that it is curried
  // because a blocking subject will call it asynchronously
  var run = function run(_subject) {
    var waitForCursor = 0;
    // This array will contain all the unique ids

    // In case there are asynchronous events to wait for, we put a counter here.
    // Like this, when an asynchronous event is done, we know if there are more
    //  to wait for.
    // So this variable below acts like a pseudo generator that will assign
    //  unique keys to each actions.
    var waitFor = [];
    // The function that is called everytime a specific describer is done.
    // It will decide if describer was the last one of the list
    //  - if so, it will exit the test as done.
    var done = function done() {
      if (!waitFor.length) {
        emit('done', results);
      }
    };
    // tell listeners we are beginning the test
    emit('describe', _subject);
    // the results of the test go here
    var results = [];
    // Testing each describer on the subject
    describers.forEach(function (describer) {
      // The result of this particular describer
      // We expect two kind of results here:
      // - a Is (it is a regular describer)

      var result = describer(_subject);
      // If we have a listner, we need to listen to subject's event
      if (result instanceof Listener) {
        if (
        // We need to make sure subject is an emitter.
        // We issue a test failure otherwise.
        !(_subject instanceof _events.EventEmitter)) {
          var notAnEmitter = new _is.Is('is emitting "' + result.event + '"', _subject, {
            event: result.event,
            passed: false,
            error: new Error('Subject is not an emitter')
          });
          results.push(notAnEmitter);
        } else {
          (function () {
            // the unique key for this describer
            var eventCursor = waitForCursor++;
            // we add unique key to list of unique keys
            waitFor.push(eventCursor);
            // They are 2 types: should emit AND should not emit.
            // First, deal with "should not emit"
            if (result.not) {
              (function () {
                // a unique id
                var didNotEmitKey = waitForCursor++;
                // a timer that will succeed if event not emitted
                var shouldNotEmit = setTimeout(function () {
                  var okDidNotEmit = new _is.Is('is not emitting "' + result.event + '"', _subject, {
                    event: result.event,
                    passed: true
                  });
                  emit('passed', okDidNotEmit);
                  waitFor = _lodash2.default.without(waitFor, didNotEmitKey);
                  done();
                }, 2500);
                // We put a listener that would trigger a fail if emitted
                _subject.once(result.event, function () {
                  clearTimeout(shouldNotEmit);
                  var failDidNotEmit = new _is.Is('is not emitting "' + result.event + '"', _subject, {
                    event: result.event,
                    passed: false
                  });
                  emit('passed', failDidNotEmit);
                  waitFor = _lodash2.default.without(waitFor, didNotEmitKey);
                  done();
                });
              })();
            } else {
              // now we listen to subject's event
              _subject.once(result.event, function () {
                for (var _len4 = arguments.length, messages = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                  messages[_key4] = arguments[_key4];
                }

                // since event did get triggered, we remove it for our queue
                waitFor = _lodash2.default.without(waitFor, eventCursor);
                // if we just want to listen an event and we don't care about what
                //  is emitted, good enough: test is passed!
                if (!result.checkers.length) {
                  var eventResult = new _is.Is('is emitting "' + result.event + '"', _subject, {
                    event: result.event,
                    messages: messages,
                    passed: true
                  });
                  emit('passed', eventResult);
                  results.push(eventResult);
                  done();
                } else {
                  // We now run each describer which will return emitters
                  result.checkers.forEach(function (checker) {
                    var subEmitter = checker.apply(undefined, messages);
                    // we add unique keys also to our sub emitters
                    var subEmitterKey = waitForCursor++;
                    subEmitter.on('describe', function (subSubject) {
                      return emitter.emit('describe', subSubject);
                    }).on('passed', function (subResults) {
                      return emitter.emit('passed', subResults);
                    }).on('failed', function (subResults) {
                      return emitter.emit('failed', subResults);
                    }).on('done', function (subResults) {
                      emitter.emit('done', subResults);
                      waitFor = _lodash2.default.without(waitFor, subEmitterKey);
                      done();
                    });
                  });
                }
              });
            }
          })();
        }
      } else {
        if (result.passed) {
          emit('passed', result);
        } else if (result.passed === false) {
          emit('failed', result);
        }
        results.push(result);
      }
    });
    done();
  };
  if (subject instanceof Promise) {
    subject.then(run, run);
  } else {
    run(subject);
  }
  return emitter;
}

function batch(label) {
  for (var _len5 = arguments.length, describers = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    describers[_key5 - 1] = arguments[_key5];
  }

  return new Promise(function (resolve, reject) {
    console.log(label);
    var functions = describers.filter(function (describer) {
      return typeof describer === 'function';
    });
    var options = describers.filter(function (describer) {
      return (typeof describer === 'undefined' ? 'undefined' : _typeof(describer)) === 'object';
    });
    (0, _promiseSequencer2.default)(functions).then(function (results) {
      return resolve({ label: label, results: results, options: options });
    }).catch(reject);
  });
}

describe.batch = batch;

// const emitter = new EventEmitter();
//
// process.nextTick(() => {
//   emitter.emit('hello', 5);
// });

// describe(1, it.is.a.number, it.is.a.string)
// describe(new Promise((resolve) => resolve('hello')), it.is('hello'))
// describe(emitter, it.is.a(EventEmitter))
// describe(emitter, it.emits('hello', (number) => describe(number, it.is(5))))
//   .on('describe', (subject) => console.log({subject}))
//   .on('passed', (result) => console.log('√', result))
//   .on('failed', (result) => console.log('X', result))
//   .on('done', (results) => console.log('done', results));