#!/usr/bin/env node
// @flow weak

import colors from 'colors/safe';
import sequencer from 'promise-sequencer';
import Bin from '../lib/bin';
import packageJSON from '../../package.json';

const package_json: {version: string} = packageJSON;

declare var process: {
  send: Function,
  title: string,
  on: Function,
  argv: Array<string>,
  exit: Function,
};

function printTime (time: number): {time: number, duration: string} {
  let duration = '';

  if (time < 1000) {
    duration = time + 'ms';
  } else if (time < (1000 * 60)) {
    duration = time / 1000 + 's';
  } else if (time < (1000 * (60 * 60))) {
    duration = time / 1000 / 60 + 'minutes';
  }

  return {time, duration};
}

function pad(character:string, times:number): string {
  let str = '';
  for (let iterate = 0; iterate < times; iterate++) {
    str += character;
  }
  return str;
}

// the test
let done = false;

// For Unix use: pkill redtea
process.title = 'redtea';

process.on('exit', () => {
  if (!done) {
    const margin = pad(' ', 16);
    console.log('  ', colors.bgRed(pad(' ', 44)));
    console.log('  ', colors.bgRed.bold(
      `${margin}TEST FAILED   (EXIT)${margin}`)
    );
    console.log('  ', colors.bgRed(pad));
  }
});

console.log(colors.red.bold(`redtea v${package_json.version}`));

if (process.argv[2] === '-v') {
  done = true;
  process.exit(0);
}

const props = {};
const flags = [];
const files = [];

// Process command line arguments
process.argv
  .filter((arg: string, index: number): boolean => index > 1)
  .forEach((arg: string) => {
    if (/\=/.test(arg)) {
      const bits = arg.split('=');
      props[bits[0]] = bits[1];
    } else if (/^--/.test(arg)) {
      flags.push(arg.replace(/^--/, ''));
    } else {
      files.push(arg);
    }
  });

sequencer(
  () => Bin.getFiles(...files),
  _files => Bin.getFunctions(_files, props, flags)
)
.then(results => {
  const [, functions] = results;
  const runner = Bin.runFunctions(functions, props, flags);
  runner.live
    .on('error', error => console.log(error.stack))
    .on('failed', test => {
      if (!test.children.length) {
        let {duration, time} = printTime(test.time);

        if (time < 50) {
          duration = colors.white(`(${duration})`);
        } else if (time < 100) {
          duration = colors.yellow(`(${duration})`);
        } else {
          duration = colors.red(`(${duration})`);
        }

        let tab = '';

        if (test.parents.length) {
          for (let cursor = 0; cursor < test.parents.length; cursor++) {
            tab += colors.grey('|_');
          }
        }

        console.log(
          tab + colors.bold.red('✖'),
          colors.red(test.label),
          duration
        );

        const lines = test.error.stack
          .split(/\n/).map(line => line.yellow).join('\n' + tab);

        console.log(tab + ' ' + lines);
      }
    })
    .on('passed', test => {
      if (!test.children.length) {
        let {duration, time} = printTime(test.time);

        if (time < 50) {
          duration = colors.white(`(${duration})`);
        } else if (time < 100) {
          duration = colors.yellow(`(${duration})`);
        } else {
          duration = colors.red(`(${duration})`);
        }

        let tab = '';

        if (test.parents.length) {
          for (let cursor = 0; cursor < test.parents.length; cursor++) {
            tab += colors.grey('|_');
          }
        }
        console.log(tab + colors.bold.green('✔'), test.label.grey, duration);
      }
    })
    .on('test', test => {
      if (test.children.length) {
        let tab = '';

        if (test.parents.length) {
          for (let cursor = 0; cursor < test.parents.length; cursor++) {
            tab += colors.grey('|_');
          }
        }

        console.log(tab + '↘', colors.bold(test.label));
      }
    });

  runner
    .then(run_results => {
      done = true;
      let tests = [],
        passed = [],
        failed = [],
        time = 0;
      run_results.forEach(result => {
        tests = tests.concat(result.children.filter(
          test => !test.children.length)
        );
        passed = passed.concat(result.passed.filter(
          test => !test.children.length)
        );
        failed = failed.concat(result.failed.filter(
          test => !test.children.length)
        );
        time += result.time;
      });

      const {duration} = printTime(time);

      const test_num = `${tests.length} tests in ${duration}`;
      const passed_num = `${passed.length} passed`;
      const failed_num = `${failed.length} failed`;

      console.log();
      console.log('   ', pad('-', 44));
      console.log('  ',
        colors.bold(test_num),
        colors.green(passed_num),
        colors.red(failed_num)
      );
      console.log('  ', pad('-', 44));

      if (failed.length) {
        console.log('  ', colors.bgRed(pad(' ', 44)));
        console.log('  ', colors.bgRed.bold(
          `${pad(' ', 16)}TEST FAILED   (x${failed.length})${pad(' ', 16)}`
        ));
        console.log('  ', colors.bgRed(pad(' ', 44)));
        console.log();

        failed.forEach((test, index) => {
          let parents = test.parents
            .map(parent => colors.bgRed(` ${parent.label} `))
            .join('\n');

          if (parents) {
            parents += '\n';
          }

          console.log(
            colors.bgRed.bold(`${index + 1}/${failed.length}`),
            '--',
            parents,
            colors.red.bold(test.label),
            colors.red.italic(
              ('failed after ' + printTime(test.time).duration)
            )
          );

          console.log(test.error.stack.yellow);

          console.log();
          console.log();
        });
      } else {
        console.log('  ', colors.bgGreen(pad(' ', 44)));
        console.log('  ', colors.bgGreen.bold(
          `${pad(' ', 16)}ALL TESTS PASSED${pad(' ', 16)}`
        ));
        console.log('  ', colors.bgGreen(pad(' ', 44)));
      }

      if (typeof process.send === 'function') {
        process.send(JSON.stringify({redtea: {
          children: tests.map(test => ({
            label: test.label,
            status: test.status,
            time: test.time,
            id: test.id,
            children: test.children.map(child => ({
              label: child.label,
              status: child.status,
              time: child.time,
              id: child.id,
            }))
          })),
          passed: passed.map(test => ({
            label: test.label,
            status: test.status,
            time: test.time,
            id: test.id,
            children: test.children.map(child => ({
              label: child.label,
              status: child.status,
              time: child.time,
              id: child.id,
            }))
          })),
          failed: failed.map(test => ({
            label: test.label,
            status: test.status,
            time: test.time,
            id: test.id,
            error: {
              name: test.error.name,
              message: test.error.message,
              stack: test.error.stack,
            },
            children: test.children.map(child => ({
              label: child.label,
              status: child.status,
              time: child.time,
              id: child.id,
            })),
            parents: test.parents.map(parent => ({
              label: parent.label,
              status: parent.status,
              time: parent.time,
              id: parent.id,
            }))
          })),
          time: time,
        }}));
      }

      process.exit(failed.length);
    })
    .catch(error => console.log(error.stack));
})
.catch(error => console.log(error.stack));
