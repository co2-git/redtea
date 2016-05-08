"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function Listener(event, checkers) {
  var not = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  _classCallCheck(this, Listener);

  this.checkers = [];
  this.not = false;

  this.event = event;
  this.checkers = checkers;
  this.not = not;
};

exports.default = Listener;