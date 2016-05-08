'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.

// `describe` returns an emitter that will emit the following events:
// - "describe" (subject: any) this event is triggered to show test has begun
// - "done" (results: Array<Is>)

describe = describe;

var _events = require('events');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function describeIt() {}

function describePromise(promise) {
  promise.then(describeIt, describeIt);
}

function describeEmitter() {}function describe(subject) {
  for (var _len = arguments.length, describers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    describers[_key - 1] = arguments[_key];
  }

  // Separate functions from ocnfigurations
  var functions = describers.filter(function (describer) {
    return typeof describer === 'function';
  });
  var options = describers.filter(function (describer) {
    return (typeof describer === 'undefined' ? 'undefined' : _typeof(describer)) === 'object';
  });
  // The test emitter
  var emitter = new _events.EventEmitter();
  // The function to emit
  var emit = function emit(event) {
    for (var _len2 = arguments.length, messages = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      messages[_key2 - 1] = arguments[_key2];
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
        emit('done', results, options);
      }
    };
    // tell listeners we are beginning the test
    emit('describe', _subject, options);
    // the results of the test go here
    var results = [];
    // Testing each describer on the subject
    functions.forEach(function (describer) {
      // The result of this particular describer
      // We expect two kind of results here:
      // - a Is (it is a regular describer)

      var result = describer(_subject);
      // If we have a listener, we need to listen to subject's event
      if (result instanceof Listener) {
        console.log('I am an emitter');
        // We need to make sure subject is an emitter.
        // We issue a test failure otherwise.
        if (!(_subject instanceof _events.EventEmitter)) {
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
                console.log('is not', result);
                // a unique id
                var didNotEmitKey = waitForCursor++;
                // a timer that will succeed if event not emitted
                var shouldNotEmit = setTimeout(function () {
                  console.log('i am in settimeotu', _subject);
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
                  console.log('should not emit', result);
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
                for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  messages[_key3] = arguments[_key3];
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
  for (var _len4 = arguments.length, describers = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    describers[_key4 - 1] = arguments[_key4];
  }

  var functions = describers.filter(function (describer) {
    return typeof describer === 'function';
  });
  var emitter = new _events.EventEmitter();
  process.nextTick(function () {
    emitter.emit('batch', label);
    if (!functions.length) {
      emitter.emit('done', []);
      return;
    }
    var subResults = [];
    var isDone = function isDone() {
      if (subResults.length === functions.length) {
        emitter.emit('done', subResults);
      }
    };
    functions.forEach(function (fn) {
      var describer = fn();
      describer.on('batch', function (describerLabel) {
        return emitter.emit('batch', describerLabel);
      }).on('describe', function (subject) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        return emitter.emit('describe', subject, options);
      }).on('passed', function (results) {
        return emitter.emit('passed', results);
      }).on('failed', function (results) {
        return emitter.emit('failed', results);
      }).on('done', function (results) {
        return emitter.emit('_done', results);
      }).on('done', function (results) {
        subResults.push(results);
        isDone();
      });
    });
  });
  return emitter;
}

describe.batch = batch;