// @flow
import Batch from './is';

export default function batch(
    label: string,
    ...tests: Function[]
  ): Function {
  return (): Batch => new Batch(label, ...tests);
}
