// @flow
import colors from 'colors/safe';
import 'should';
import is from '../lib/is';

function test(label: string, story: Function): void {
  try {
    story();
    console.log(colors.green(`  √ ${label}`));
  } catch (error) {
    console.log(colors.red(`  × ${label}`));
    console.log(colors.yellow(error.stack));
  }
}

console.log(colors.bold.underline.italic('is'));

test('null is null', () => is(null, null));
