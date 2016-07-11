import chalk from './chalk';

process.title = 'redtea';
process.redtea = {
  complete: false,
  props: {},
  flags: [],
  files: [],
  tests: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
};
process.on('exit', () => {
  if (!process.redtea.complete) {
    chalk('TEST FAILED (EXIT)', 'error');
    console.log(process.redtea);
  }
});

process.argv
  .filter((arg: string, index: number): boolean => index > 1)
  .forEach((arg: string) => {
    if (/\=/.test(arg)) {
      const bits = arg.split('=');
      process.redtea.props[bits[0]] = bits[1];
    } else if (/^--/.test(arg)) {
      process.redtea.flags.push(arg.replace(/^--/, ''));
    } else {
      process.redtea.files.push(arg);
    }
  });
