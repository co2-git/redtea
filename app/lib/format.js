// @flow
import {EventEmitter} from 'events';

export default function format(value: any): string {
  const type = typeof value;
  let parsable = true;
  let json = '';
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
    return `number ${value}`;
  }
  if (type === 'string') {
    return `string "${value}"`;
  }
  if (type === 'function') {
    return `function ${value.name}`;
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
    if (value instanceof EventEmitter) {
      return `emitter ${value.constructor.name} (${value._eventsCount} listeners)`;
    }
    if (value instanceof Error) {
      const stack = value.stack.split(/\n/).filter(line => line);
      return `Error ${value.message} ${stack[1]} ${stack[2]} ${stack[3]}...`;
    }
    if (value instanceof Promise) {
      return 'Promise';
    }
    if (value.constructor === Object) {
      if (parsable) {
        if (json.length > 70) {
          return 'object ' + json.substr(0, 70) + '...';
        }
        return 'object ' + json;
      }
      return 'object [Circular]';
    }
    const {name} = value.constructor;
    switch (name) {
    case 'Error': {
      let {message} = value;
      if (message.length > 70) {
        message = message.substr(0, 70) + '...';
      }
      return `Error {name: "${value.name}", message: "${message}"}`;
    }
    case 'RegExp': {
      let pattern = value.toString();
      if (pattern.length > 70) {
        pattern = pattern.substr(0, 70) + '...';
      }
      return `Regular Expression ${pattern}`;
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
