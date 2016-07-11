import type from './type';

export default function it(that: any, assertion: Object) {
  const assertions = {};
  if (('value' in assertion)) {
    assertions.value = that === assertion.value;
  }
  if (('type' in assertion)) {
    assertions.type = type(that, assertion.type);
  }
  return assertions;
}
