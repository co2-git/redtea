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

function itIs(value) {
  return function (subject) {
    (0, _is2.default)(subject, value);
  };
}

function itIsA(value) {
  return function (subject) {
    _is2.default.type(subject, value);
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
  emits: emits
};

var aa = 'a';

it.is[aa] = itIsA;
it.is.an = itIsA;

function describe(subject) {
  for (var _len2 = arguments.length, describers = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    describers[_key2 - 1] = arguments[_key2];
  }

  return new Promise(function (resolve, reject) {
    var run = function run(_subject) {
      describers.forEach(function (describer) {
        try {
          describer(_subject);
        } catch (error) {
          reject(error);
        }
      });
      resolve();
    };
    if (subject instanceof Promise) {
      subject.then(run, run);
    } else if (subject instanceof _events.EventEmitter) {
      (function () {
        var emitted = 0;
        var triggers = describers.map(function (describer) {
          return describer();
        });
        triggers.forEach(function (trigger) {
          return subject.on(trigger.event, function () {
            for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              messages[_key3] = arguments[_key3];
            }

            emitted++;
            (0, _promiseSequencer2.default)(trigger.checkers.map(function (checker) {
              return function () {
                return checker.apply(undefined, messages);
              };
            })).then(function () {
              if (emitted === triggers.length) {
                resolve();
              }
            }).catch(reject);
          });
        });
      })();
    } else {
      run(subject);
    }
  });
}

// describe(1, it.is(1), it.is.a(Number))
//   .then(results => console.log({results}))
//   .catch(error => console.log({error}));
//
// describe(new Promise((resolve) => resolve(22)), it.is.a(Number))
//   .then(results => console.log({results}))
//   .catch(error => console.log({error}));
//
// describe(new Promise((resolve, reject) => reject(new Error('!'))), it.is.an(Error))
//   .then(results => console.log({results}))
//   .catch(error => console.log({error}));

var emitter = new _events.EventEmitter();

setTimeout(function () {
  return emitter.emit('hello');
}, 1000);

setTimeout(function () {
  return emitter.emit('foo', 1);
}, 2000);

describe(emitter, it.emits('hello'), it.emits('foo', function (num) {
  return describe(num, it.is.a(Number));
})).then(function (results) {
  return console.log({ results: results });
}).catch(function (error) {
  return console.log({ error: error });
});

// describe.batch = (label, ...describers) => {
//   return new Promise((resolve, reject) => {
//     sequencer(describers)
//       .then(resolve)
//       .catch(reject);
//   });
// };
//
// describe
//   .batch('hello',
//     () => describe(1, it.is(1))
//   )
//   .then(() => console.log('OK'))
//   .catch(error => console.log(error.stack));