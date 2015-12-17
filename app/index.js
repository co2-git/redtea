'use strict';

import colors from 'colors';

function it (label, promise, options = {}, stories = []) {
  if ( typeof promise === 'function' ) {
    stories.push({ [label] : promise, options });
  }
  else if ( Array.isArray(promise) ) {
    const _stories = [];
    promise.map(promise => promise((label, promise) => it(label, promise, options || {}, _stories)));
    stories.push({ [label] : _stories, options });
  }
  else if ( promise instanceof Describer ) {
    stories.push({ [label] : promise, options });
  }
}

function describe ( descriptor, stories, options = {} ) {
  return new Promise((ok, ko) => {
    try {

      if ( typeof stories === 'function' ) {
        const _stories = [];
        stories((label, promise, options = {}) => it(label, promise, options, _stories));
        stories = _stories;
      }

      let tab = options.tab || '';
      let tests = 0;
      let passed = 0;
      let failed = 0;
      let begin = Date.now();

      if ( ! tab ) {
        console.log();
        console.log('  ' + descriptor.blue.bold);
      }
      else {
        console.log('  ' + tab + descriptor.bold);
      }

      let cursor = 0;

      const run = () => {
        if ( stories[cursor] ) {
          try {
            if ( typeof stories[cursor] !== 'object' ) {
              if ( typeof stories[cursor] !== 'function' ) {
                throw new Error('Must be an object');
              }
            }

            const start = Date.now();

            let promise;

            let isNested = false;

            const storyDescriptor = Object.keys(stories[cursor])[0];

            /**
             *  {
             *    timeout : <Number> - milliseconds
             *  }
             */

            const storyOptions = stories[cursor].options || {};

            let story = stories[cursor][storyDescriptor];

            if ( story instanceof Describer ) {
              story = story.func();
            }

            if ( Array.isArray(story) ) {
              promise = describe(storyDescriptor, story, { tab : tab + '|_'.grey });

              isNested = true;
            }

            else {
              promise = new Promise((ok, ko) => {

                let fulfilled = null;

                if ( 'timeout' in storyOptions ) {
                  setTimeout(() => {
                    if ( fulfilled === null ) {
                      ko(new Error(`Could not fulfill test, script timed out after ${storyOptions.timeout} milliseconds`));
                    }
                  }, storyOptions.timeout);
                }

                story(
                  (...args) => {
                    fulfilled = true;
                    ok.apply(null, args);
                  },
                  (...args) => {
                    fulfilled = false;
                    ko.apply(null, args);
                  }
                );
              });
            }

            promise.then(
              p => {
                try {
                  if ( ! isNested ) {
                    tests ++;
                    passed ++;

                    const end = Date.now() - start;

                    let time;

                    if ( end < 50 ) {
                      time = `(${end.toString()} ms)`.white;
                    }

                    else if ( end < 250 ) {
                      time = `(${end.toString()} ms)`.yellow;
                    }

                    else {
                      time = `(${end.toString()} ms)`.red;
                    }

                    console.log('  ' + tab + '|_'.grey + '✔'.green.bold + ' ' + storyDescriptor.grey + ' ' + time);
                  }

                  else {
                    tests += p.tests;
                    passed += p.passed;
                    failed += p.failed;
                  }

                  cursor ++;
                  run();
                }
                catch ( error ) {
                  ko(error);
                }
              },
              error => {
                try {
                  tests ++;
                  failed ++;

                  const end = Date.now() - start;

                  let time;

                  if ( end < 50 ) {
                    time = `(${end.toString()} ms)`.grey;
                  }

                  else if ( end < 250 ) {
                    time = `(${end.toString()} ms)`.yellow;
                  }

                  else {
                    time = `(${end.toString()} ms)`.red;
                  }

                  console.log('  ' + tab + '  ' + '✖'.red.bold + ' ' + storyDescriptor.red.italic + ' ' + time);

                  if ( error.stack ) {
                    console.log(error.stack.yellow);
                  }
                  else {
                    console.log(error);
                  }

                  cursor ++;
                  run();
                }
                catch ( error ) {
                  ko(error);
                }
              }
            );
          }
          catch ( error ) {
            ko(error);
          }
        }
        else {
          ok({ tests, passed, failed, time : Date.now() - begin });
        }
      };

      run();
    }
    catch ( error ) {
      ko(error);
    }
  });
}

class Describer {
  constructor (func) {
    this.func = () => {
      const stories = [];
      func()((label, promise, options = {}) => it(label, promise, options, stories));
      return stories;
    };
  }
}

describe.Describer = Describer;

describe.imply = (fn) => new Describer(fn);
describe.use = (fn) => new Describer(fn);

export default describe;
