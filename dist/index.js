'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indeed = require('./lib/indeed');

var _indeed2 = _interopRequireDefault(_indeed);

var _assuming = require('./lib/assuming');

var _assuming2 = _interopRequireDefault(_assuming);

var _describe = require('./lib/describe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { indeed: _indeed2.default, assuming: _assuming2.default, describe: _describe.describe, it: _describe.it }; /**
                                                                                                                                * @name redtea main module
                                                                                                                                * @description exposes redtea methods
                                                                                                                                * 
                                                                                                                              **/