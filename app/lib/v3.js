'use strict';

import Queue from './queue';
import colors from 'colors';

function describe(label, story, options = {}) {
  if ( this ) {
    options = this;
  }

  // console.log('describe'.grey, label.grey.italic, options);

  return new Promise((ok, ko) => {
    try {
      const queue = options.queue || new Queue();

      options.tab = options.tab || '';

      const stats = options.stats || { tests : 1, passed : 0, failed : 0 };

      if ( typeof story !== 'function' ) {
        return ko(new Error('redtea > Can only describe functions'));
      }

      const success = () => {

        // if ( ! packed.nested ) {
          // stats.tests ++;
          stats.passed ++;
        // }

        if ( options.callbacks ) {
          options.callbacks[0]();
        }

        if ( ! packed.nested ) {
          console.log(' ', packed.tab + '✔'.green.bold, packed.label.grey, packed.id.toString().grey);
        }

        // console.log('ok stats', packed.label, stats);

        process.nextTick(() => {
          if ( ( stats.passed + stats.failed ) === stats.tests ) {
            ok(stats);
          }
        });
      };

      const failure = error => {
        // if ( ! packed.nested ) {
          // stats.tests ++;
          stats.failed ++;
        // }

        if ( options.callbacks ) {
          options.callbacks[1]();
        }

        // console.log('ko stats', packed.label, stats);

        console.log(' ', packed.tab, '✖'.red.bold, packed.label.red, packed.id.toString().grey);

        if ( error.stack ) {
          console.log(error.stack.yellow);
        }
        else {
          console.log(error);
        }

        process.nextTick(() => {
          if ( ( stats.passed + stats.failed ) === stats.tests ) {
            ok(stats);
          }
        });
      };

      const packed = {
        tab : options.tab,
        callbacks : options.callbacks,
        label : label,
        nested : false,
        stats,
        success,
        error : failure
      };

      packed.story = () => new Promise((ok, ko) => {
        try {
          const tell = story((...args) => {
            packed.nested = true;

            stats.tests ++;

            return describe.apply(
              Object.assign({},
                { tab : options.tab + '|_'.grey },
                { parent : packed.id },
                { callbacks : [success, failure] },
                { queue }
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
      });

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
