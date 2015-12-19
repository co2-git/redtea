'use strict';

import queue from './queue';
import colors from 'colors';

queue
  .on('success', story => {
    if ( ! story.nested ) {
      console.log(' ', story.tab + '✔'.green.bold, story.label.grey, story.id.toString().grey);
    }
  })

  .on('error', (story, error) => {
    console.log(story.tab, '✖'.red.bold, story.label.red, story.id.grey);
    if ( error.stack ) {
      console.log(error.stack.yellow);
    }
    else {
      console.log(error);
    }
  });

function describe(label, story, options = {}) {
  if ( this ) {
    options = this;
  }

  return new Promise((ok, ko) => {
    try {
      options.tab = options.tab || '';

      const stats = options.stats || { tests : 0, passed : 0, failed : 0 };

      if ( typeof story !== 'function' ) {
        return ko(new Error('redtea > Can only describe functions'));
      }

      const packed = {
        tab : options.tab,
        label : label,
        nested : false,
        stats,
        story : () => new Promise((ok, ko) => {
          try {
            const tell = story((...args) => {
              packed.nested = true;
              return describe.apply(
                Object.assign({},
                  { tab : options.tab + '|_'.grey },
                  { stats },
                  { parent : packed.id }
                )
              , args);
            });

            if ( packed.nested ) {
              console.log(`  ${(options.tab)}${label.bgBlue}`)
            }

            if ( tell instanceof Promise ) {
              tell.then(ok, ko);
            }
            else {
              ok();
            }
          }
          catch ( error ) {
            ko(error);
          }
        }),
        success : () => {
          if ( ! packed.nested ) {
            // stats.tests ++;
            stats.passed ++;
          }

          if ( ( stats.passed + stats.failed ) === stats.tests ) {
            process.nextTick(() => ok(stats));
          }
        },
        error : () => {
          if ( ! packed.nested ) {
            // stats.tests ++;
            stats.failed ++;
          }

          if ( ( stats.passed + stats.failed ) === stats.tests ) {
            process.nextTick(() => ok(stats));
          }
        }
      };

      if ( 'parent' in options ) {
        packed.parent = options.parent;
      }

      queue.push(packed);
    }
    catch ( error ) {
      ko(error);
    }
  });
}

export default describe;
