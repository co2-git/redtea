'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = format;
function format(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  var parsable = true;
  var json = '';
  try {
    json = JSON.stringify(value);
  } catch (error) {
    parsable = false;
  }
  if (value === null) {
    return 'null';
  }
  if (type === 'undefined') {
    return type;
  }
  if (type === 'boolean') {
    return json;
  }
  if (type === 'number') {
    return 'number ' + value;
  }
  if (type === 'string') {
    return 'string "' + value + '"';
  }
  if (type === 'function') {
    return 'function ' + value.name;
  }
  if (Array.isArray(value)) {
    if (parsable) {
      if (json.length > 70) {
        return 'array ' + json.substr(0, 70) + '...';
      }
      return 'array ' + json;
    }
    return 'array [Circular]';
  }
  if (type === 'object') {
    if (value.constructor === Object) {
      if (parsable) {
        if (json.length > 70) {
          return 'object ' + json.substr(0, 70) + '...';
        }
        return 'object ' + json;
      }
      return 'object [Circular]';
    }
    var name = value.constructor.name;

    switch (name) {
      case 'Error':
        {
          var message = value.message;

          if (message.length > 70) {
            message = message.substr(0, 70) + '...';
          }
          return 'Error {name: "' + value.name + '", message: "' + message + '"}';
        }
      case 'RegExp':
        {
          var pattern = value.toString();
          if (pattern.length > 70) {
            pattern = pattern.substr(0, 70) + '...';
          }
          return 'Regular Expression ' + pattern;
        }
      default:
        if (parsable) {
          if (json.length > 70) {
            return name + ' ' + json.substr(0, 70) + '...';
          }
          return name + ' ' + json;
        }
        return name + ' [Circular]';
    }
  }
  if (parsable) {
    return json;
  }
  return '???';
}