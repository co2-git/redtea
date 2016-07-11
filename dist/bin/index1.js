'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

require('./process');

var _overthrow = require('./overthrow');

var _overthrow2 = _interopRequireDefault(_overthrow);

var _fetch = require('../lib/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _runEmitters = require('../lib/runEmitters');

var _runEmitters2 = _interopRequireDefault(_runEmitters);

var _chalk = require('./chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _process$redtea = process.redtea;
var props = _process$redtea.props;
var flags = _process$redtea.flags;
var files = _process$redtea.files;


(0, _promiseSequencer2.default)(function () {
  return _fetch2.default.getFiles.apply(_fetch2.default, _toConsumableArray(files));
}, function (_files) {
  return _fetch2.default.getFunctions(_files, props, flags);
}).then(function (results) {
  try {
    var _results = _slicedToArray(results, 2);

    var functions = _results[1];

    _runEmitters2.default.apply(undefined, _toConsumableArray(functions)).on('error', function (error) {
      return console.log(error.stack);
    }).on('batch', function (label) {
      console.log(_colors2.default.blue.bold(label));
    }).on('over', function () {
      var _process$redtea2 = process.redtea;
      var tests = _process$redtea2.tests;
      var passed = _process$redtea2.passed;
      var failed = _process$redtea2.failed;

      process.redtea.complete = true;

      console.log(tests + ' tests,', passed + ' passed,', failed + ' failed');

      if (tests === passed) {
        (0, _chalk2.default)('ALL TESTS PASSED');
      }
    });
  } catch (error) {
    (0, _overthrow2.default)(error);
  }
}).catch(function (error) {
  (0, _overthrow2.default)(error);
});