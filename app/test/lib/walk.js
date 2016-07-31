// @flow
import run from '../run';
import walk from '../../lib/walk';
import isReport from '../is/report';
import type {REPORT} from '../../config/types';

run('walk()', [
  {
    label: 'walk is a function',
    assert: typeof walk === 'function'
  },
  {
    label: 'walk echoes a report',
    assert: (): boolean => {
      walk(null, {value: null}, (report: REPORT) => {
        isReport(report, {
          type: 'value',
          expected: null,
          that: null,
          valid: true,
        });
      });
      return true;
    }
  },
  {
    label: 'walk echoes a report for fail',
    assert: (): boolean => {
      walk(null, {value: 1}, (report: REPORT) => {
        isReport(report, {
          type: 'value',
          expected: 1,
          that: null,
          valid: false,
        });
      });
      return true;
    }
  },
  {
    label: 'walk echoes a report for not',
    assert: (): boolean => {
      walk(null, {not: {value: 1}}, (report: REPORT) => {
        isReport(report, {
          type: 'value',
          expected: {not: 1},
          that: null,
          valid: true,
        });
      });
      return true;
    }
  }
]);
