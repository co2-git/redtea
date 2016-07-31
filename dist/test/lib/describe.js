'use strict';

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _describe = require('../../lib/describe');

var _describe2 = _interopRequireDefault(_describe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var label = 'hello';
var that = true;
var assertions = { value: true };
var obj = new _describe.Redtea_Describe(label, that, assertions);

var describer = (0, _describe2.default)(label, that, assertions);
var described = describer();

(0, _run2.default)('describe()', [{
  label: 'Redtea_Describe is a class',
  assert: typeof _describe.Redtea_Describe === 'function'
}, {
  label: 'new Redtea_Describe has label',
  assert: obj.label === label
}, {
  label: 'new Redtea_Describe has that',
  assert: obj.that === that
}, {
  label: 'new Redtea_Describe has assertions',
  assert: obj.assert === assertions
}, {
  label: 'describe is a function',
  assert: typeof _describe2.default === 'function'
}, {
  label: 'describe returns a function',
  assert: typeof describer === 'function'
}, {
  label: 'function returns an instance of Redtea_Describe',
  assert: described instanceof _describe.Redtea_Describe
}]);