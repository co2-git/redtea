// @flow

export default function type(
    it: any,
    _type: null | Function | Function[],
    not : boolean = false
  ): boolean {
  if (Array.isArray(_type) && _type.length) {
    const [arrayType] = _type;
    return it.every((_it: any): boolean => type(_it, arrayType, not));
  }
  let passed;
  switch (_type) {
  case null:
    return it === null;
  case String:
    passed = typeof it === 'string';
    break;
  case Number: {
    if (it === null || typeof it === 'undefined') {
      passed = false;
    } else {
      passed = it.constructor === Number && isFinite(it);
    }
    break;
  }
  case Boolean:
    passed = typeof it === 'boolean';
    break;
  case Function:
    passed = typeof it === 'function';
    break;
  case Object: {
    passed = it && typeof it === 'object' && !Array.isArray(
      it
    );
    break;
  }
  case Array:
    passed = Array.isArray(it);
    break;
  default:
    passed = Boolean(it instanceof _type);
    break;
  }
  if (not) {
    passed = !passed;
  }
  return passed;
}
