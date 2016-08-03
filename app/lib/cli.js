// @flow
import os from 'os';
import {EventEmitter} from 'events';
import colors from 'colors';
import pkg from '../../package.json';
import getFiles from './getFiles';
import getFunctions from './getFunctions';
import run from './all/run';
import format from './format';
import Batch from './batch/is';
import Describe from './describe/is';
import Emitter from './emitter/is';
import IsAPromise from './promise/is';
import * as RUN_EVENTS from './all/events';
import * as BATCH_EVENTS from './batch/events';
import * as DESCRIBE_EVENTS from './describe/events';
import * as PROMISE_EVENTS from './promise/events';
import * as EMITTER_EVENTS from './emitter/events';
import type {REPORT} from '../config/types';

type JSON_REPORT = {
  version: string,
  status: ?number,
  done: boolean,
  tests: number,
  passed: number,
  failed: number,
  files?: string[],
  cmd?: string,
  start: Date,
  end?: Date,
  all: Array<any>,
  os?: {
    arch: string,
    platform: string,
    release: string,
    type: string,
  },
  error?: {
    name: string,
    message: string,
    stack: string[],
  },
};

const json: JSON_REPORT = {
  version: pkg.version,
  done: false,
  status: null,
  tests: 0,
  passed: 0,
  failed: 0,
  start: new Date(),
  all: [],
};

process.on('exit', () => {
  if (!json.done) {
    console.log(colors.red('✖ Tests could not complete!'));
    json.status = 8;
    json.end = new Date();
    json.error = {
      name: 'UncaughtError',
      message: 'Uncaught error',
      stack: [],
    };
    console.log(colors.grey(JSON.stringify(json, null, 2)));
    process.exit(8);
  }
});

function close() {
  json.done = true;
  console.log();
  console.log(
    `${json.tests} test(s) ${json.passed} passed ${json.failed} failed`
  );
  console.log();
  console.log(json.tests === json.passed ?
    colors.bgGreen.bold.white('Tests passed!') :
    colors.bgRed.bold.white('Tests failed')
  );
  console.log();
  if (json.tests !== json.passed) {
    json.status = 1;
    json.end = new Date();
    console.log(colors.grey(JSON.stringify(json, null, 2)));
    process.exit(1);
  }
}

function printTab(tab: number, bg: string = 'bgBlack'): string {
  let print = '';
  for (let cursor = 0; cursor < tab; cursor++) {
    print += '  ';
  }
  return colors.bold[bg](print);
}

function onResult(
    test: Describe|Batch|IsAPromise|Emitter,
    report: REPORT,
    tab: number = 0
  ) {
  json.tests++;
  if (report.valid) {
    json.passed++;
  } else {
    json.failed++;
  }
  console.log(
    printTab(tab) +
    colors.bold.white[report.valid ? 'green' : 'bgRed'](
      report.valid ? ' √ ' : ' ✖ '
    ),
    colors[report.valid ? 'grey' : 'yellow'](report.message)
  );
  if (report.error) {
    console.log(colors.yellow(report.error.stack));
  }
}

export default async function init(...files: string[]) {
  try {
    json.cmd = process.argv.join(' ');
    json.os = {
      arch: os.arch(),
      platform: os.platform(),
      release: os.release(),
      type: os.type(),
    };
    json.files = await getFiles(...files);
    const functions: Function[] = getFunctions(json.files);
    const emitter: EventEmitter = run(...functions);
    let tab: number = 0;

    emitter
      .on(RUN_EVENTS.ERROR, (error: Error) => {
        console.log(colors.yellow(error.stack));
        json.tests++;
        json.failed++;
        close();
        json.status = 8;
        json.end = new Date();
        console.log(colors.grey(JSON.stringify(json, null, 2)));
        process.exit(8);
      })
      .on(RUN_EVENTS.END, () => {
        json.status = 0;
        json.end = new Date();
        console.log(colors.grey(JSON.stringify(json, null, 2)));
        console.log();
        close();
        process.exit(0);
      })
      .on(RUN_EVENTS.START, () => {
        // console.log(tab + 'start');
      })
      .on(BATCH_EVENTS.START, (batch: Batch) => {
        console.log();
        console.log(
          printTab(tab),
          colors.underline(batch.label)
        );
        console.log();
        tab++;
      })
      .on(BATCH_EVENTS.END, () => {
        tab--;
      })
      .on(BATCH_EVENTS.ERROR, (batch: Batch, error: Error) => {
        console.log('batch error', error.stack);
      })
      .on(DESCRIBE_EVENTS.START, (test: Describe) => {
        console.log(printTab(tab),
          colors.white(test.label),
          colors.italic.grey(format(test.that))
        );
        tab++;
      })
      .on(DESCRIBE_EVENTS.END, () => {
        tab--;
      })
      .on(DESCRIBE_EVENTS.RESULT, (describe: Describe, report: REPORT) => {
        onResult(describe, report, tab);
      })
      .on(PROMISE_EVENTS.RESULT, (promise: Describe, report: REPORT) => {
        onResult(promise, report, tab);
      })
      .on(PROMISE_EVENTS.START, (promise: IsAPromise) => {
        console.log(
          printTab(tab),
          colors.white(promise.label)
        );
        tab++;
      })
      .on(PROMISE_EVENTS.PROMISE, (promise: IsAPromise, resolved: any) => {
        console.log(printTab(tab), format(resolved));
      })
      .on(PROMISE_EVENTS.END, () => {
        tab--;
      })
      .on(PROMISE_EVENTS.ERROR, (result: IsAPromise, error: Error) => {
        json.tests++;
        json.failed++;
        console.log(
          printTab(tab),
          colors.white.bold.bgRed(' ✖ '),
          colors.red(result.label),
          colors.white.bold.bgRed(error.message)
        );
        console.log(colors.yellow(error.stack));
      })
      .on(EMITTER_EVENTS.ERROR, (_emitter: Emitter, error: Error) => {
        console.log('error', error);
      })
      .on(EMITTER_EVENTS.START, (_emitter: Emitter) => {
        console.log(
          printTab(tab),
          colors.white(_emitter.label),
          colors.italic(format(_emitter.that))
        );
        tab++;
      })
      .on(EMITTER_EVENTS.END, (): 1 => 1)
      .on(EMITTER_EVENTS.START_EVENT, (event: string, ...messages: any[]) => {
        json.tests++;
        json.passed++;
        console.log(
          printTab(tab),
          colors.green.bold(' √ ') + `event "${event}"`,
          colors.grey(format(messages).replace(/^array /, ''))
        );
        tab++;
      })
      .on(EMITTER_EVENTS.EVENT_MESSAGE, (message: any) => {
        console.log(printTab(tab), colors.grey(format(message)));
      })
      .on(EMITTER_EVENTS.END_EVENT, () => {
        tab--;
      })
      .on(EMITTER_EVENTS.RESULT, (_emitter: Emitter, report: REPORT) => {
        onResult(_emitter, report, tab);
      })
      ;
  } catch (error) {
    console.log(colors.yellow(error.stack));
    json.status = 8;
    json.end = new Date();
    json.error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
    console.log(colors.grey(JSON.stringify(json, null, 2)));
    process.exit(8);
  }
}
