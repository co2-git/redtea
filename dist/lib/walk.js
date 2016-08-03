'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = walk;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _format = require('./format');

var _format2 = _interopRequireDefault(_format);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walkNot(walker) {
  walk((0, _extends3.default)({}, walker, { not: true }));
}

function walkValue(walker) {
  var valid = _lodash2.default.isEqual(walker.that, walker.assertions.value);
  walker.report({
    type: 'value',
    expected: walker.not ? { not: walker.assertions.value } : walker.assertions.value,
    that: walker.that,
    valid: walker.not ? !valid : valid,
    message: walker.ns + ' is ' + (walker.not ? 'not ' : '') + (0, _format2.default)(walker.assertions.value)
  });
}

function walkType(walker) {
  var isA = void 0;
  if (Array.isArray(walker.assertions.type)) {
    isA = walker.assertions.type[0] ? walker.assertions.type[0].name : (0, _format2.default)(walker.assertions.type[0]);
    isA = 'array of ' + isA;
  } else {
    isA = walker.assertions.type ? walker.assertions.type.name : (0, _format2.default)(walker.assertions.type);
  }
  var an = /^(a|i|o|u|e)/i.test(isA) ? 'an' : 'a';
  var valid = (0, _type2.default)(walker.that, walker.assertions.type);
  walker.report({
    type: 'type',
    expected: walker.assertions.type,
    that: walker.that,
    valid: walker.not ? !valid : valid,
    message: 'is ' + (walker.not ? 'not ' : '') + an + ' ' + isA,
    error: !valid && new TypeError('Expecting instance of ' + (0, _format2.default)(walker.assertions.type) + ',' + (' instead got ' + (0, _format2.default)(walker.that)))
  });
}

function walkTypes(walker) {
  var valid = walker.assertions.types && walker.assertions.types.every(function (type) {
    return (0, _type2.default)(walker.that, type);
  }) || false;
  walker.report({
    type: 'types',
    expected: walker.assertions.types,
    that: walker.that,
    valid: walker.not ? !valid : valid,
    message: 'is ' + (walker.not ? 'not ' : '') + ' an instance of ' + ('' + walker.assertions.types.map(function (type) {
      return (0, _format2.default)(type).replace(/^function /, '');
    }).join(', '))
  });
}

function walkShape(walker) {
  var ns = walker.ns || 'object';
  for (var key in walker.assertions.shape) {
    var valid = key in walker.that;
    walker.report({
      type: 'shape',
      expected: key,
      that: walker.that,
      valid: walker.not ? !valid : valid,
      message: ns + ' has key ' + key,
      error: !valid && new TypeError('Expected ' + (0, _format2.default)(walker.that) + '.' + key)
    });
    if (valid) {
      walk((0, _extends3.default)({}, walker, {
        that: walker.that[key],
        assertions: walker.assertions.shape[key],
        ns: ns + '.' + key
      }));
    }
  }
}

function walk() {
  var walker = arguments.length <= 0 || arguments[0] === undefined ? { not: false } : arguments[0];

  for (var type in walker.assertions) {
    if (type === 'not') {
      walkNot(walker);
    } else if (type === 'value') {
      walkValue(walker);
    } else if (type === 'type') {
      walkType(walker);
    } else if (type === 'types') {
      walkTypes(walker);
    } else if (type === 'shape') {
      walkShape(walker);
    }
  }
}