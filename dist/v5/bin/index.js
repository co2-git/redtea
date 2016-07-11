'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('colors');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _type = require('../lib/type');

var _type2 = _interopRequireDefault(_type);

var _format = require('../lib/format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _process$argv = _slicedToArray(process.argv, 3);

var file = _process$argv[2];


var tab = '';
var tests = 0;
var passed = 0;
var failed = 0;

function run() {
  tab += '  ';

  for (var _len = arguments.length, testers = Array(_len), _key = 0; _key < _len; _key++) {
    testers[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = testers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var tester = _step.value;

      var result = tester();
      if (result.constructor.name === 'Batch') {
        console.log(tab.black, result.label.underline);
        run.apply(undefined, _toConsumableArray(result.tests));
      } else if (result.constructor.name === 'Describe') {
        console.log(tab.black, result.label.italic, (0, _format2.default)(result.that).grey);
        for (var attr in result.assert) {
          if (attr === 'value') {
            tests++;
            if (_lodash2.default.isEqual(result.that, result.assert.value)) {
              passed++;
              console.log((tab + '  ').black, '√ Value matches'.green);
            } else {
              failed++;
              console.log((tab + '  ').black, '✖ Value does not match'.bold.red);
              console.log((tab + '  ').black, ('Expected value <' + (0, _format2.default)(result.that) + '> to match ' + ('<' + (0, _format2.default)(result.assert.value) + '>')).yellow);
            }
          } else if (attr === 'type') {
            tests++;
            if ((0, _type2.default)(result.that, result.type)) {
              passed++;
              console.log(tab + '    ', '√');
            }
          }
        }
      }
      console.log();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  tab = tab.replace(/ {2}$/, '');
}

var test = require(_path2.default.join(process.cwd(), file)).default;

run(test);

console.log();
console.log(tests + ' tests, ' + passed + ' passed, ' + failed + ' failed');
console.log();

if (failed) {
  throw new Error('Tests are failing');
}