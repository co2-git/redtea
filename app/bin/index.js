#!/usr/bin/env node

import colors           from 'colors';
import sequencer        from 'sequencer';
import Bin              from '../lib/bin';
import packageJSON      from '../../package.json';

console.log({ sequencer });

function printTime (time) {
  let duration = '';

  if ( time < 1000 ) {
    duration = time + 'ms';
  }

  else if ( time < (1000 * 60) ) {
    duration = time / 1000 + 's';
  }

  else if ( time < (1000 * (60 * 60)) ) {
    duration = time / 1000 / 60 + 'minutes';
  }

  return { time, duration };
}

// the test
let done = false;

// For Unix use: pkill redtea

process.title = 'redtea';

process.on('exit', () => {
  if ( ! done ) {
    console.log('  ', '                                                          '.bgRed);
    console.log('  ', `                 TEST FAILED   (EXIT)                     `.bgRed.bold);
    console.log('  ', '                                                          '.bgRed);
  }
});

console.log(`redtea v${packageJSON.version}`.red.bold);

if ( process.argv[2] === '-v' ) {
  done = true;
  process.exit(0);
}

const props = {};

const flags = [];

const files = [];

process.argv
  .filter((arg, index) => index > 1)

  .forEach((arg, index) => {

    if ( /=/.test(arg) ) {
      const bits = arg.split('=');
      props[bits[0]] = bits[1];
    }

    else if ( /^--/.test(arg) ) {
      flags.push(arg.replace(/^--/, ''));
    }

    else {
      files.push(arg);
    }

  });

sequencer(
  ()      =>  Bin.getFiles(...files),
  files   =>  Bin.getFunctions(files, props, flags)
)
.then(results => {
  const [files, functions] = results;

  const runner = Bin.runFunctions(functions, props, flags);

  runner.live
    .on('error', error => console.log(error.stack))
    .on('failed', test => {
      if ( ! test.children.length ) {
        let { duration, time } = printTime(test.time);

        if ( time < 50 ) {
          duration = `(${duration})`.white
        }
        else if ( time < 100 ) {
          duration = `(${duration})`.yellow;
        }
        else {
          duration = `(${duration})`.red;
        }

        let tab = '';

        if ( test.parents.length ) {
          for ( let i = 0; i < test.parents.length; i ++ ) {
            tab += '|_'.grey;
          }
        }

        console.log(tab + '✖'.bold.red, test.label.red, duration);

        const lines = test.error.stack
          .split(/\n/).map(l => l.yellow).join('\n' + tab);

        console.log(tab + ' ' + lines);
      }
    })
    .on('passed', test => {
      if ( ! test.children.length ) {
        let { duration, time } = printTime(test.time);

        if ( time < 50 ) {
          duration = `(${duration})`.white;
        }
        else if ( time < 100 ) {
          duration = `(${duration})`.yellow;
        }
        else {
          duration = `(${duration})`.red;
        }

        let tab = '';

        if ( test.parents.length ) {
          for ( let i = 0; i < test.parents.length; i ++ ) {
            tab += '|_'.grey;
          }
        }
        console.log(tab + '✔'.bold.green, test.label.grey, duration);
      }
    })
    .on('test', test => {
      if ( test.children.length ) {
        let tab = '';

        if ( test.parents.length ) {
          for ( let i = 0; i < test.parents.length; i ++ ) {
            tab += '|_'.grey;
          }
        }

        console.log(tab + '↘', test.label.bold);
      }
    });

  runner
    .then(results => {
      done = true;

      let tests = [], passed = [], failed = [], time = 0;

      results.forEach(result => {
        tests = tests.concat(result.children.filter(t => ! t.children.length));
        passed = passed.concat(result.passed.filter(t => ! t.children.length));
        failed = failed.concat(result.failed.filter(t => ! t.children.length));
        time += result.time;
      });

      const { duration } = printTime(time);

      console.log();
      console.log('   ----------------------------------------------------------');
      console.log('  ', `${tests.length} tests in ${duration}`.bold, `${passed.length} passed`.green, `${failed.length} failed`.red);
      console.log('   ----------------------------------------------------------');

      if ( failed.length ) {
        console.log('  ', '                                                          '.bgRed);
        console.log('  ', `                  TEST FAILED   (x${failed.length})                      `.bgRed.bold);
        console.log('  ', '                                                          '.bgRed);

        console.log();

        failed.forEach((test, index) => {
          let parents = test.parents.map(p => ` ${p.label} `.bgRed).join('\n');

          if ( parents ) {
            parents += '\n';
          }

          console.log(`${index + 1}/${failed.length}`.bgRed.bold, '--', parents, test.label.red.bold, ('failed after ' +printTime(test.time).duration).red.italic);

          console.log(test.error.stack.yellow);

          console.log();
          console.log();
        });
      }

      else {
        console.log('  ', '                                                          '.bgGreen);
        console.log('  ', `                     ALL TESTS PASSED                     `.bgGreen.bold);
        console.log('  ', '                                                          '.bgGreen);
      }

      if ( process.send ) {
        process.send(JSON.stringify({ redtea : {
          children : tests.map(t => ({
            label : t.label, status : t.status, time : t.time, id : t.id,
            children : t.children.map(t => ({
              label : t.label, status : t.status, time : t.time, id : t.id
            }))
          })),
          passed : passed.map(t => ({
            label : t.label, status : t.status, time : t.time, id : t.id,
            children : t.children.map(t => ({
              label : t.label, status : t.status, time : t.time, id : t.id
            }))
          })),
          failed : failed.map(t => ({
            label : t.label, status : t.status, time : t.time, id : t.id,
            error : {
              name : t.error.name,
              message : t.error.message,
              stack : t.error.stack
            },
            children : t.children.map(t => ({
              label : t.label, status : t.status, time : t.time, id : t.id
            })),
            parents : t.parents.map(t => ({
              label : t.label, status : t.status, time : t.time, id : t.id
            }))
          })),
          time : time
        }}));
      }

      process.exit(failed.length);
    })
    .catch(error => console.log(error.stack));
})
.catch(error => console.log(error.stack));
