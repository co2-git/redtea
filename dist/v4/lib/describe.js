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

var it = exports.it = {
  is: itIs,
  emits: emits,
  does: {
    not: {
      emit: function emit(event) {
        return function () {
          return {
            event: event,
            checkers: [new Promise(function (resolve, reject) {
              return reject(new Error('Emitter was not supposed to emit ' + event));
            })],
            not: true
          };
        };
      }
    }
  }
};

var aa = 'a';

it.is[aa] = itIsA;
it.is.an = itIsA;
it.is.not = itIsNot;
it.is.not[aa] = itIsNotA;
it.is.not.an = itIsNotA;

function describe(subject) {
  for (var _len2 = arguments.length, describers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    describers[_key2 - 1] = arguments[_key2];
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
      (function () {
        var emitted = 0;
        var triggers = describers.map(function (describer) {
          return describer();
        });
        var listeners = triggers.filter(function (trigger) {
          return !trigger.not;
        }).length;
        var events = [];
        triggers.forEach(function (trigger) {
          return subject.on(trigger.event, function () {
            for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              messages[_key3] = arguments[_key3];
            }

            if (!trigger.not) {
              emitted++;
              (0, _promiseSequencer2.default)(trigger.checkers.map(function (checker) {
                return function () {
                  return checker.apply(undefined, messages);
                };
              })).then(function (results) {
                events.push({ subject: subject, event: trigger.event, results: results });
                if (emitted === listeners) {
                  if (listeners !== triggers.length) {
                    var notTriggered = triggers.filter(function (trigger) {
                      return trigger.not;
                    }).map(function (trigger) {
                      return { subject: subject, event: trigger.event, results: [{
                          label: 'does not emit'
                        }] };
                    });
                    events.push.apply(events, _toConsumableArray(notTriggered));
                  }
                  resolve(events);
                }
              }).catch(reject);
            } else {
              reject(new Error('Unexpected event ' + trigger.event));
            }
          });
        });
      })();
    } else {
      run(subject);
    }
  });
}

// describe(1, it.is(1), it.is.a(Number))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));

// describe(new Promise((resolve) => resolve(22)), it.is.a(Number))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));
//
// describe(new Promise((resolve, reject) => reject(new Error('!'))), it.is.an(Error))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));

// const emitter = new EventEmitter();
//
// setTimeout(() => emitter
//   .emit('hello')
// , 1000);
//
// setTimeout(() => emitter
//   .emit('foo', 1)
// , 2000);

// describe(emitter,
//     it.emits('hello'),
//     it.emits('foo',
//       (num) => describe(num, it.is.a(Number))
//     ),
//     it.does.not.emit('error')
//   )
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));

// describe(emitter, it.does.not.emit('foo'))
//   .then(results => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log({error}));;

function batch(label) {
  for (var _len4 = arguments.length, describers = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    describers[_key4 - 1] = arguments[_key4];
  }

  return new Promise(function (resolve, reject) {
    (0, _promiseSequencer2.default)(describers).then(function (results) {
      return resolve({ label: label, results: results });
    }).catch(reject);
  });
}

describe.batch = batch;

// describe
//   .batch('hello',
//     () => describe(1, it.is(1), it.is.a(Number)),
//     () => describe.batch('foo',
//       () => describe(1, it.is(1), it.is.a(Number)),
//     )
//   )
//   .then((results) => console.log(require('util').inspect(results, { depth: null })))
//   .catch(error => console.log(error.stack));