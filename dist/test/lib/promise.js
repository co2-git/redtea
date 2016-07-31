'use strict';

var _run = require('../run');

var _run2 = _interopRequireDefault(_run);

var _promise = require('../../lib/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const label = 'hello';
// const that = true;
// const assertions = {value: true};
// const obj = new Redtea_Promise(label, that, assertions);
//
// const promiser = promise(label, that, assertions);
// const promised = promiser();

(0, _run2.default)('promise()', [{
  label: 'Redtea_Promise is a class',
  assert: typeof _promise.Redtea_Promise === 'function'
}]);