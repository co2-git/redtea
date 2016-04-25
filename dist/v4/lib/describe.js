'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.it = undefined;
exports.describe = describe;

var _events = require('events');

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function itIsA(value) {
  return function (subject) {
    return _is2.default.type(subject, value);
  };
}

function itIsNotA(value) {
  return function (subject) {
    return _is2.default.not.type(subject, value);
  };
}

function emits(message) {
  for (var _len = arguments.length, checkers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    checkers[_key - 1] = arguments[_key];
  }

  return function () {
    return {
      event: message,
      checkers: checkers
    };
  };
}

function doesNotEmit(event) {
  return function () {
    return {
      event: event,
      not: true
    };
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

var aa = 'a';

it.is[aa] = itIsA;
it.is.an = itIsA;
it.is.not = itIsNot;
it.is.not[aa] = itIsNotA;
it.is.not.an = itIsNotA;

function handleEmitter(emitter) {
  for (var _len2 = arguments.length, listeners = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    listeners[_key2 - 1] = arguments[_key2];
  }

  var handlers = listeners.map(function (listener) {
    return listener();
  });
  return new Promise(function (resolve) {
    var expectedEvents = listeners
    // .filter(listener => !listener().not)
    .length;
    var receivedEvents = 0;
    var results = [];
    handlers.forEach(function (listener) {
      var event = listener.event;
      var checkers = listener.checkers;
      var not = listener.not;

      if (not) {
        (function () {
          var timeout = setTimeout(function () {
            receivedEvents++;
            results.push({
              label: 'emitter is not emitting "' + event + '"',
              passed: true,
              subject: emitter,
              event: event
            });
            if (receivedEvents === expectedEvents) {
              resolve({ subject: emitter, results: results });
            }
          }, 2500);
          emitter.once(event, function () {
            clearTimeout(timeout);
            results.push({
              label: 'emitter is not emitting "' + event + '"',
              passed: false,
              subject: emitter,
              event: event
            });
            if (receivedEvents === expectedEvents) {
              resolve({ subject: emitter, results: results });
            }
          });
        })();
      } else {
        emitter.once(event, function () {
          for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            messages[_key3] = arguments[_key3];
          }

          receivedEvents++;
          results.push({
            label: 'emitter is emitting "' + event + '"',
            passed: true,
            subject: emitter,
            event: event
          });
          var eventResults = checkers.map(function (checker) {
            return checker.apply(undefined, messages);
          });
          results.push.apply(results, _toConsumableArray(eventResults));
          if (receivedEvents === expectedEvents) {
            resolve({ subject: emitter, results: results });
          }
        });
      }
    });
  });
}

function describe(subject) {
  for (var _len4 = arguments.length, describers = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    describers[_key4 - 1] = arguments[_key4];
  }

  return new Promise(function (resolve, reject) {
    var run = function run(_subject) {
      var results = describers.map(function (describer) {
        return describer(_subject);
      });
      resolve({ subject: subject, results: results });
    };
    if (subject instanceof Promise) {
      subject.then(run, run);
    } else if (subject instanceof _events.EventEmitter) {
      handleEmitter.apply(undefined, [subject].concat(describers)).then(resolve, reject);
    } else {
      run(subject);
    }
  });
}

function batch(label) {
  for (var _len5 = arguments.length, describers = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    describers[_key5 - 1] = arguments[_key5];
  }

  return new Promise(function (resolve, reject) {
    (0, _promiseSequencer2.default)(describers).then(function (results) {
      return resolve({ label: label, results: results });
    }).catch(reject);
  });
}

describe.batch = batch;