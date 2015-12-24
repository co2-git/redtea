'use strict';

import colors from 'colors';
import sequencer from './lib/sequencer';

function it (label, story = () => {}, options = {}, id) {
  this.stories.push({ label, tell : story, options, id, parent : options.parent });
}

it.pause = milliseconds => () => new Promise(ok => setTimeout(ok, milliseconds));

function describe (label, story, options = {}, stories = []) {

  return new Promise((ok, ko) => {
    let tab = options.tab || '';

    if ( ! ( 'nested' in options ) ) {
      options.nested = true;
    }

    if ( ! ( 'tab' in options ) ) {
      options.tab = '';
    }

    const tea = {
      label,
      options,
      stories,
      tab,
      tell : story,
      children : [],
      parent : options.parent,
      id : 0
    };

    stories.push(tea);



    // story((label, story, options = {}) => it(label, story, options, stories));

    run(stories).then(
      results => {
        ok(results);
      },
      ko
    );
  });

}

function run (stories, id = 1, stats = { tests : 0, passed : 0, failed : 0, time : 0 }) {
  return new Promise((ok, ko) => {
    let index;

    const story = stories.reduce((nextInQueue, story, storyIndex) => {
      if( ! ( 'status' in story ) && ! nextInQueue ) {
        nextInQueue = story;
        index = storyIndex;
      }
      return nextInQueue;
    }, null);

    if ( story ) {
      new Promise((ok, ko) => {
        try {
          // Suporting old array syntax
          if ( Array.isArray(story.tell) ) {
            story.tell = story.tell[0];
          }

          story.starts = Date.now();

          const test = story.tell((labelChild, storyChild, optionsChild = {}) => {
            // console.log(`nesting "${story.id} ${story.label}"`.grey.italic);

            story.options.nested = true;

            return it.apply(
                { stories },
                [
                  labelChild,
                  storyChild,
                  Object.assign(
                    {},
                    optionsChild,
                    { tab : (story.tab || story.options.tab) + '|_'.grey },
                    { parent : story.id }
                  ),
                  id++
                ]
              );
          });

          if ( test && test.then ) {
            // console.log(`story "${story.label}" is a promise`.grey.italic);

            test.then(ok, ko);
          }
          else {
            ok();
          }
        }
        catch ( error ) {
          ko(error);
        }
      })
      .then(
        () => {

          story.ends = Date.now();

          let
            storiesBefore,
            storiesAfter,
            nestedStories;

          const end = Date.now() - story.starts;

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

          stats.time += end;

          if ( ! story.options.nested ) {

            console.log('  ' + (story.tab || story.options.tab) + '✔'.green.bold + ' ' + story.label.grey + ' ' + time);
          }
          else {

            const pos = stories.reduce((pos, _story, index) => {
              if ( _story.id === story.id ) {
                pos = index;
              }
              return pos;
            }, 0);

            storiesBefore = stories
              .filter((s, i)=> i <= pos ),

            storiesAfter = stories
              .filter((s, i)=> i > pos )
              .filter(_story => _story.parent !== story.id),

            nestedStories = stories
              .filter(_story => _story.parent === story.id);

            let name = story.label.bold, arrow = '↘ '.grey;

            if ( ! story.options.tab ) {
              name = name.bgBlue;
              arrow = '↘ '.bgBlue;
            }

            console.log('  ' + story.options.tab +  arrow + '' + name);
          }


          stats.tests ++;
          stats.passed ++;

          story.status = true;

          if ( Array.isArray(nestedStories) ) {
            stories = storiesBefore
              .concat(nestedStories)
              .concat(storiesAfter);
          }

          run(stories, id, stats).then(ok, ko);
        },
        error => {
          const end = Date.now() - story.starts;

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

          if ( ! story.options.nested ) {

            console.log('  ' + (story.tab || story.options.tab) + '✖'.red.bold + ' ' + story.label.red + ' ' + time);
          }

          else {
            console.log(' ', story.options.tab, story.label.bgRed.bold);
          }

          if ( error.stack ) {
            console.log(error.stack.yellow);
          }
          else {
            console.log(error);
          }

          stats.tests ++;
          stats.failed ++;
          stats.time += end;

          story.status = false;

          run(stories, id, stats).then(ok, ko);;
        }
      );
    }

    else {
      ok(stats);
    }
  });
}

describe.use = fn => {
  return it => fn()(it);
};

export default describe;
