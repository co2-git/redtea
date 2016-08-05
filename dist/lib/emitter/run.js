'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = runEmitter;

var _events = require('events');

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _events2 = require('./events');

var EVENTS = _interopRequireWildcard(_events2);

var _runEvent = require('./runEvent');

var _runEvent2 = _interopRequireDefault(_runEvent);

var _runNonEvent = require('./runNonEvent');

var _runNonEvent2 = _interopRequireDefault(_runNonEvent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runEmitter(emitter, observer) {
  var _this = this;

  return new Promise(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(resolve, reject) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var watcher, _emitter$assertions, emits, emitsNot, promises;

                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // Disclose emitter from function
                        watcher = emitter.that();
                        // Exit if disclosed return is not an emitter

                        if (watcher instanceof _events.EventEmitter) {
                          _context.next = 3;
                          break;
                        }

                        throw new Error('Can not watch events from a non-emitter');

                      case 3:
                        // Tell observer we began testing emitter
                        observer.emit(EVENTS.START, (0, _extends3.default)({}, emitter, {
                          that: watcher
                        }));
                        // Internal counters
                        _emitter$assertions = emitter.assertions;
                        emits = _emitter$assertions.emits;
                        emitsNot = _emitter$assertions.emitsNot;
                        // Walk each event

                        promises = [];

                        if (emits) {
                          // Events to watch
                          promises.push(Promise.all(Object.keys(emits).map(function (event) {
                            return (0, _runEvent2.default)(emitter, watcher, observer, emits[event], event);
                          })));
                        }
                        // Events that are not supposed to trigger
                        if (emitsNot) {
                          promises.push(Promise.all(Object.keys(emitsNot).map(function (event) {
                            return (0, _runNonEvent2.default)(emitter, watcher, observer, event, emitsNot[event]);
                          })));
                        }
                        _context.next = 12;
                        return Promise.all(promises);

                      case 12:
                        // Return results
                        observer.emit(EVENTS.END, emitter);
                        resolve();

                      case 14:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              })(), 't0', 2);

            case 2:
              _context2.next = 8;
              break;

            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);

              observer.emit(EVENTS.ERROR, emitter, _context2.t1);
              reject(_context2.t1);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[0, 4]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}