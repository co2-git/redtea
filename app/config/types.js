// @flow

export
type ASSERTION_TYPE = 'not'
  | 'type'
  | 'value'
  | 'emits';

export
type EVENTS = {
  [event: string]: {
    wait?: number
  } & ASSERTIONS
};

export
type ASSERTIONS = {
  value?: any,
  type?: ?Function,
  not?: ASSERTIONS,
  emits?: EVENTS,
};

export
type RESULTS_JSON = {
  batch?: BATCH_JSON,
};

export
type BATCH_JSON = {
  label: string,
  tests: RESULTS_JSON,
};

export
type TEST_RESULT = {
  type: ASSERTION_TYPE,
  expected: any,
  that: any,
  valid: boolean,
};

export
type TESTS_JSON = {
  label: string,
  that: any,
  tests: TEST_RESULT[],
};

export
type REPORT = {
  type: ASSERTION_TYPE,
  that: any,
  expected: any,
  valid: boolean,
  message: string,
};

export
type REPORT_CHECKER = {
  type?: ASSERTION_TYPE,
  that?: any,
  expected?: any,
  valid?: boolean,
};
