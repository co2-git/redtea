#!/usr/bin/bash
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _format = require('../lib/format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var tests = 0;
var passed = 0;
var failed = 0;

function readResult(result) {
  var tab = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  // console.log(require('util').inspect(result, { depth: null }));
  console.log(tab, _colors2.default.cyan.bold(result.label));
  result.results.forEach(function (result2) {
    if ('subject' in result2) {
      console.log(tab, '  ', _colors2.default.bold((0, _format2.default)(result2.subject)));
      result2.results.forEach(function (result3) {
        tests++;
        var symbol = result3.passed ? '√' : '×';
        var symbolColor = result3.passed ? 'green' : 'red';
        var labelColor = result3.passed ? 'grey' : 'red';
        if (result3.passed) {
          passed++;
        } else {
          failed++;
        }
        console.log(tab, '    ', _colors2.default[symbolColor].bold(symbol), _colors2.default[labelColor]('is' + result3.label.split('is')[1]));
      });
    } else if ('label' in result2) {
      readResult(result2, tab + '  ');
    }
  });
}

var _process$argv = _slicedToArray(process.argv, 3);

var file = _process$argv[2];


var test = require(_path2.default.join(process.cwd(), file)).default;

var testResults = [];

(0, _promiseSequencer2.default)(test).then(function (results) {
  testResults.push.apply(testResults, _toConsumableArray(results));
}).catch(function (error) {
  console.log({ error: error });
  var err = _lodash2.default.pick(error, ['name', 'subject', 'value', 'type', 'message']);
  console.log(err, testResults);
  // testResults.push({
  //   subject,
  //
  // });
}).then(function () {
  testResults.forEach(function (result) {
    return readResult(result);
  });
  console.log({ tests: tests, passed: passed });
});