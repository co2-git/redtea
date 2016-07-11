'use strict';

var _is2 = require('./is');

var _is3 = _interopRequireDefault(_is2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mixed = function Mixed() {
  _classCallCheck(this, Mixed);

  this.types = [];

  for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  this.types = types;
};

function define(it, type, checker) {
  var _type = void 0;
  var _is = void 0;
  if (type instanceof Mixed) {
    _type = type.types;
    _is = type.types.some(function (mixedType) {
      return (0, _is3.default)(it, mixedType);
    });
  } else {
    _type = type;
    _is = (0, _is3.default)(it, type);
  }
  var _checked = void 0;
  if (typeof checker === 'function') {
    _checked = checker(it);
  } else if (arguments.length > 2) {
    _checked = it === checker;
  }
  console.log({ it: it, type: _type, is: _is, checked: _checked });
}

// class Not {
//   constructor(type) {
//     this.type = type;
//   }
// }
//
// function not(type) {
//   return new Not(type);
// }
//
// define(1, Number);
// define(1, Mixed(Number, String));
// define(1, Not(String));
//
// define(1, Number, (num: number): boolean => num > 0.5);
//

define(1, Number);
define(1, new Mixed(Number, String));
define(1, Number, function (number) {
  return number < 1;
});
define(1, Number, 1);