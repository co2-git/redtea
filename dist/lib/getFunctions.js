'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFunctions;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFunctions(files) {
  return files.map(function (file) {
    var absoluteFile = void 0;

    if (/^\//.test(file)) {
      absoluteFile = file;
    } else {
      absoluteFile = _path2.default.join(process.cwd(), file);
    }

    var fn = require(absoluteFile);

    if (typeof fn.default === 'function') {
      fn = fn.default;
    }

    if (typeof fn !== 'function') {
      throw new Error('You need to expose a function');
    }
    return fn;
  });
}