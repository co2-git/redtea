// @flow

export default function type(
    it: any,
    type: ?Function,
    not : boolean = false
  ): boolean {
  let passed;
  switch (type) {
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
    passed = Boolean(it instanceof type);
    break;
  }
  if (not) {
    passed = !passed;
  }
  return passed;
}
