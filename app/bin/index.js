import 'colors';
import path from 'path';
import _ from 'lodash';
import type from '../lib/type';
import format from '../lib/format';

const [,, file] = process.argv;

let tab = '';
let tests = 0;
let passed = 0;
let failed = 0;

function run(...testers) {
  tab += '  ';
  for (const tester of testers) {
    const result = tester();
    if (result.constructor.name === 'Batch') {
      console.log(tab.black, result.label.underline);
      run(...result.tests);
    } else if (result.constructor.name === 'Describe') {
      console.log(
        tab.black,
        result.label.italic,
        format(result.that).grey
      );
      for (const attr in result.assert) {
        if (attr === 'value') {
          tests++;
          if (_.isEqual(result.that, result.assert.value)) {
            passed++;
            console.log(`${tab}  `.black, '√ Value matches'.green);
          } else {
            failed++;
            console.log(`${tab}  `.black, '✖ Value does not match'.bold.red);
            console.log(`${tab}  `.black,
              (`Expected value <${format(result.that)}> to match ` +
                `<${format(result.assert.value)}>`).yellow
            );
          }
        } else if (attr === 'type') {
          tests++;
          if (type(result.that, result.type)) {
            passed++;
            console.log(`${tab}    `, '√');
          }
        }
      }
    }
    console.log();
  }
  tab = tab.replace(/ {2}$/, '');
}

const test = require(path.join(process.cwd(), file)).default;

run(test);

console.log();
console.log(`${tests} tests, ${passed} passed, ${failed} failed`);
console.log();

if (failed) {
  throw new Error('Tests are failing');
}
