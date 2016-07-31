'use strict';

var _events = require('events');

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _emitter2 = require('../../lib/emitter');

var _emitter3 = _interopRequireDefault(_emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var label1 = 'hello';
var _emitter1 = function _emitter1() {
  return new _events.EventEmitter();
};
var assertions1 = { value: true };
var obj1 = new _emitter2.Redtea_Emitter(label1, _emitter1, assertions1);

var caller1 = (0, _emitter3.default)(label1, _emitter1, assertions1);
var called1 = caller1();

(0, _run2.default)('emitter()', [{
  label: 'Redtea_Emitter is a class',
  assert: typeof _emitter2.Redtea_Emitter === 'function'
}, {
  label: 'new Redtea_Emitter has label',
  assert: obj.label === label
}, {
  label: 'new Redtea_Emitter has emitter',
  assert: obj.emitter === _emitter
}, {
  label: 'new Redtea_Emitter has assertions',
  assert: obj.assertions === assertions
}, {
  label: 'emitter is a function',
  assert: typeof caller === 'function'
}, {
  label: 'emitter returns an instance of Redtea_Emitter',
  assert: called instanceof _emitter2.Redtea_Emitter
}, {
  label: 'new Redtea_Emitter has label',
  assert: obj1.label === label1
}, {
  label: 'new Redtea_Emitter has emitter',
  assert: obj1.emitter === _emitter1
}, {
  label: 'new Redtea_Emitter has assertions',
  assert: obj1.assertions === assertions1
}, {
  label: 'emitter is a function',
  assert: typeof caller1 === 'function'
}, {
  label: 'emitter returns an instance of Redtea_Emitter',
  assert: called1 instanceof _emitter2.Redtea_Emitter
}]);