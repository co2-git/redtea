"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runAll;

var _marked = [runAll].map(regeneratorRuntime.mark);

function runAll(subject) {
  for (var _len = arguments.length, describers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    describers[_key - 1] = arguments[_key];
  }

  var cursor;
  return regeneratorRuntime.wrap(function runAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cursor = 0;

        case 1:
          if (!describers[cursor]) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return describers[cursor](subject);

        case 4:
          cursor++;
          _context.next = 1;
          break;

        case 7:
          return _context.abrupt("return", true);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}