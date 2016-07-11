import sequencer from 'promise-sequencer';
import './process';
import overthrow from './overthrow';
import fetch from '../lib/fetch';
import runEmitters from '../lib/runEmitters';
import chalk from './chalk';
import colors from 'colors';

const {props, flags, files} = process.redtea;

sequencer(
  (): Promise => fetch.getFiles(...files),
  (_files: Array<string>): Promise => fetch.getFunctions(_files, props, flags)
).then((results: Array<any>) => {
  try {
    const [, functions] = results;
    runEmitters(...functions)
      .on('error', error => console.log(error.stack))
      .on('batch', label => {
        console.log(colors.blue.bold(label));
      })
      .on('over', () => {
        const {tests, passed, failed} = process.redtea;
        process.redtea.complete = true;

        console.log(
          `${tests} tests,`,
          `${passed} passed,`,
          `${failed} failed`,
        );

        if (tests === passed) {
          chalk('ALL TESTS PASSED');
        }
      });
  } catch (error) {
    overthrow(error);
  }
}).catch((error: Error) => {
  overthrow(error);
});
