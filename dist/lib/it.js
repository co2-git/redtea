'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function itIs(value) {
  return function _itIs(subject) {
    return (0, _is2.default)(subject, value);
  };
}

function itIsNot(value) {
  return function _itIsNot(subject) {
    return _is2.default.not(subject, value);
  };
}

function itIsA(type) {
  return function _itIsA(subject) {
    return _is2.default.type(subject, type);
  };
}

function itIsNotA(value) {
  return function _itIsNotA(subject) {
    return _is2.default.not.type(subject, value);
  };
}

function emits(event) {
  for (var _len = arguments.length, checkers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    checkers[_key - 1] = arguments[_key];
  }

  return function _emits() {
    return new _listener2.default(event, checkers);
  };
}

function doesNotEmit(event) {
  return function _doesNotEmit() {
    return new _listener2.default(event, [], true);
  };
}

var it = {
  is: itIs
};

it.is.true = itIs(true);
it.is.false = itIs(false);
it.is.null = itIs(null);
it.is.undefined = itIs(undefined);

it.is.not = itIsNot;

it.is.not.true = itIsNot(true);
it.is.not.false = itIsNot(false);
it.is.not.null = itIsNot(null);
it.is.not.undefined = itIsNot(undefined);

var aa = 'a';
it.is[aa] = itIsA;
it.is.an = itIsA;
it.is.a.string = itIsA(String);
it.is.a.number = itIsA(Number);
it.is.a.boolean = itIsA(Boolean);
it.is.a.date = itIsA(Date);
it.is.a.promise = itIsA(Promise);
it.is.a.function = itIsA(Function);
it.is.a.regular = { expression: itIsA(RegExp) };
it.is.an.emitter = itIsA(_events.EventEmitter);
it.is.an.error = itIsA(Error);
it.is.an.object = itIsA(Object);
it.is.an.array = itIsA(Array);
it.is.not[aa] = itIsNotA;
it.is.not.an = itIsNotA;
it.is.not.an.error = itIsNotA(Error);
it.is.not.a.string = itIsNotA(String);
it.is.not.a.number = itIsNotA(Number);
it.is.not.a.function = itIsNotA(Function);
it.is.not.a.boolean = itIsNotA(Boolean);
it.is.not.an.object = itIsNotA(Object);
it.is.not.an.array = itIsNotA(Array);
it.is.not.an.emitter = itIsNotA(_events.EventEmitter);
it.is.not.a.promise = itIsNotA(Promise);
it.is.not.a.date = itIsNotA(Date);
it.is.not.a.regular = { expression: itIsNotA(RegExp) };

it.is.emitting = emits;

var defaultError = new Error('Default redtea error placeholder');

var isThrowing = function isThrowing() {
  var error = arguments.length <= 0 || arguments[0] === undefined ? defaultError : arguments[0];
  return function (subject) {
    var label = 'is throwing ' + error.name;
    if (typeof subject !== 'function') {
      return new _is.Is(label, subject, {
        passed: false,
        error: new Error('Expecting a function')
      });
    }
    var passed = true;
    try {
      subject();
      passed = false;
    } catch (err) {
      passed = err.name === error.name;
    } finally {
      return new _is.Is(label, subject, {
        passed: passed
      });
    }
  };
};

it.is.throwing = isThrowing;

it.is.not.throwing = function () {
  var error = arguments.length <= 0 || arguments[0] === undefined ? defaultError : arguments[0];
  return function (subject) {
    var label = 'is not throwing ' + error.name;
    if (typeof subject !== 'function') {
      return new _is.Is(label, subject, {
        passed: false,
        error: new Error('Expecting a function')
      });
    }
    var passed = true;
    try {
      subject();
    } catch (err) {
      passed = err.name !== error.name;
    } finally {
      return new _is.Is(label, subject, {
        passed: passed
      });
    }
  };
};

exports.default = it;