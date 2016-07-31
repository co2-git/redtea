// @flow
import Describe from './is';

export default function describe(
    label: string,
    that: any,
    assertions: Object
  ): () => Describe {
  return (): Describe => new Describe(label, that, assertions);
}
