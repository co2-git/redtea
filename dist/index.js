'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.it = exports.describe = exports.assuming = exports.indeed = undefined;

var _indeed = require('./lib/indeed');

var _indeed2 = _interopRequireDefault(_indeed);

var _assuming = require('./lib/assuming');

var _assuming2 = _interopRequireDefault(_assuming);

var _describe = require('./lib/describe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.indeed = _indeed2.default; /**
                                     * @name redtea main module
                                     * @description exposes redtea methods
                                     * 
                                   **/

exports.assuming = _assuming2.default;
exports.describe = _describe.describe;
exports.it = _describe.it;