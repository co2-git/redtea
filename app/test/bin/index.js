// @flow

import {spawn} from 'child_process';
import {EventEmitter} from 'events';
import _ from 'lodash';
import run from '../run';
import pkg from '../../../package.json';

function exec(cmd: string, options: OPTIONS = {}): EventEmitter {
  const emitter = new EventEmitter();
  const bits = cmd.split(/\s+/);
  const entry = bits.shift();
  const ps = spawn(entry, bits, options);

  let stdout = '';
  let stderr = '';

  ps
    .on('error', (error: Error) => {
      emitter.emit('error', error);
    })
    .on('exit', (status: number|string) => {
      process.stdin.unpipe(ps.stdin);
      process.stdin.end();
      emitter.emit('status', status, stdout, stderr);
    });

  ps.stdout.on('data', (data: Buffer) => {
    stdout += data.toString();
  });
  ps.stderr.on('data', (data: Buffer) => {
    stderr += data.toString();
  });

  return emitter;
}

run('cli', [
  {
    label: 'Print version (`redtea --version`)',
    promise: (): Promise<Array<string|number>> =>
    new Promise(async (resolve: Function, reject: Function) => {
      try {
        const emitter = exec('node dist/bin/index --version');
        emitter.on('status', (status, stdout, stderr) => {
          resolve({status, stdout, stderr});
        });
      } catch (error) {
        reject(error);
      }
    }),
    assert: (results): boolean[] => [
      results.stdout.trim() === `redtea v${pkg.version}`,
      results.status === 0,
    ]
  },
  {
    label: 'Exec a test file',
    promise: (): Promise<> => new Promise((resolve, reject) => {
      try {
        const emitter = exec('node dist/bin/index dist/test/tests/value.js');
        emitter.on('status', (status, stdout, stderr) => {
          resolve({status, stdout, stderr});
        });
      } catch (error) {
        reject(error);
      }
    }),
    assert: (results): boolean[] => {
      const lines = results.stdout.trim().split(/\n/);
      return [
        results.status === 0,
        _.last(lines) === 'Tests passed!',
      ];
    }
  }
]);
