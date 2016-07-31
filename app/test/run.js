import colors from 'colors';
import assert from 'assert';

function runAssertion(assertion, ...params) {
  // console.log('asserting', assertion, ...params);
  if (typeof assertion === 'function') {
    runAssertion(assertion(...params));
  } else if (Array.isArray(assertion)) {
    assertion.forEach(as => runAssertion(as, ...params));
  } else if (typeof assertion === 'boolean') {
    assert(assertion);
  }
}

export default function run(label, tests) {
  console.log();
  console.log(colors.white.bgBlue.bold(label));
  console.log();

  tests.forEach(async (test) => {
    try {
      if (test.promise) {
        const results = await test.promise();
        runAssertion(test.assert, results);
      } else if (test.emitter) {
        for (const event in test.emitter.events) {
          test.emitter.on(event => {
            console.log('event', event);
          });
        }
      } else {
        runAssertion(test.assert);
      }
      console.log(colors.green(` √ ${test.label}`));
    } catch (error) {
      console.log(colors.red(`  ✖ ${test.label}`));
      console.log(error.stack);
      process.exit(8);
    }
  });
}
