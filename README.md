redtea
===

Test framework for JavaScript.

# Usage

```javascript
// test.js
import describe from 'redtea';

export default describe.batch(
  'My tests',
    describe('Number', 1, {type: Number}),
);
```

```bash
sudo npm install --global redtea
npm install --save-dev redtea
redtea test.js
```

```
My tests
  Number (number 1)
    √ is a Number

1 test(s), 1 passed, 0 failed
```

# `describe`

`describe()` is the core function of `redtea`. It will assert a given value against an object of properties.

## Notation

```javascript
type DESCRIBE = (label: string, value: any, assertions: ASSERTIONS) => Function;
```

## Example

```javascript
describe('Is a number and is equal to 10', 10, {type: Number, value: 10});
```

# `batch`

Use `batch` if you want to group tests together. You can use nested groups of tests this way too.

## Notation

```javascript
type BATCH = (label: string, ...tests: Array<Function>) => Function;
```

## Example

```javascript
describe.batch('Groups',
  describe.batch('Group 1'),
  describe.batch('Group 2',
    describe.batch('Group 3'),
  ),
);
```

# `promise`

You can evaluate the return of a promise using `promise`.

## Notation

```javascript
type PROMISE = (label: string, promise: () => Promise, assertions: ASSERTIONS);
```

## Example

```javascript
describe.promise(
  'it should fulfill "hello"',
  () => new Promise(resolve => resolve('hello')),
  {value: 'hello'}
);

// Catching errors
describe.promise(
  'it should reject promise',
  () => new Promise((resolve, reject) => reject(new Error('Ouch'))),
  {
    type: Error,
    has: {message: 'Ouch'},
  }
);
```

# `emitter`

You can also assert events emitted by an emitter.

## Notation

```javascript
type EMITTER = (label: string, emitter: () => EventEmitter, assertions: ASSERTIONS);
```

## Example

```javascript
import {EventEmitter} from 'events';

class Emitter extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    process.nextTick(::this.greetings);
  }
  greetings() {
    this.emit('hello', this.name);
  }
}

describe.emitter(
  'it should greet "hello John"',
  () => new Emitter('John'),
  {
    emits: {
      hello: {
        wait: 250,
        value: 'John',
      }
    }
  }
);

// Make sure some events are not emitted
describe.emitter(
  'it should not throw error',
  () => new Emitter('John'),
  {
    not: {
      emits: {
        error: 5000,
      }
    },
  }
);
```

# Assertions

## Notations

```javascript
type ASSERTIONS = {
  type?: TYPE,
  value?: any,
  has?: any,
  some?: (item: any, index: number, items: Array<any>) => boolean,
  every?: (item: any, index: number, items: Array<any>) => boolean,
  above: number | Date,
  below: number | Date,
  not?: ASSERTIONS,
  emits: EMITTERS,
};

type TYPE = Function | null | TYPE_EXTRA | Array<Function | null | TYPE_EXTRA>;

type TYPE_EXTRA = {
  mixed?: [TYPE],
};

type EMITTERS = {
  [event: string]: ASSERTIONS & {wait?: Number},
};
```

## `value: any`

The value to match that. We use lodash's [isEqual](https://lodash.com/docs#isEqual) for comparisons.

```javascript
define('Value', 10, {value: 10});
```

## `type: TYPE`

Type comparison.

```javascript
define('Is null', null, {type: null});
define('Is a regular expression', /a/, {type: RegExp});

class Foo {}
define('Is a foo', new Foo(), {type: Foo});

// Arrays
define('Array type', [1, 2, 3], {type: [Number]});

// Mixed arrays
define('Array type', [1, 'a'], {type: [{mixed: [Number, String]}]});

// Mixed types
define('Is a number or a string', '1', {type: {mixed: [String, Number]}});

// Maybe (type or else null)
define('Is maybe a number, else is null', 1, {type: {mixed: [Number, null]}});
```

## `has: any`

## String

Will perform a regular expression

```javascript
define('Has abc', 'abcdefgh', {has: /abc/});
```

## Array

Has at least one item matching.

```javascript
define('Has 1', [1, 2, 3], {has: 1});
```

## Object

Check if properties exist.

```javascript
define('Has foo: 1', {foo: 1, bar: 2}, {has: {foo: 1}});
// property exists
define('Has foo', {foo: 1, bar: 2}, {has: 'foo'});
// properties exist
define('Has foo and bar', {foo: 1, bar: 2}, {has: ['foo', 'bar']});
```

## `some: (item: any, index: number, items: Array<any>) => boolean`

Check if some items of the array match.

```javascript
define(
  'At least 1 item greater than 5',
  [1, 5, 10],
  {some: (number => number > 5)}
);
```

## `every: (item: any, index: number, items: Array<any>) => boolean`

Check if every items of the array match.

```javascript
define(
  'All items greater than 5',
  [10, 15, 20],
  {every: (number => number > 5)}
);
```

## `above: number | Date`

```javascript
define(
  'Number is above 2',
  3,
  {above: 2}
);

define(
  'Date is in the future',
  new Date([2020]),
  {above: new Date()}
);
```

## `below: number | Date`

```javascript
define(
  'Number is below 2',
  1,
  {below: 2}
);

define(
  'Date is in the past',
  new Date([1980]),
  {below: new Date()}
);
```

## `between: Array<number> | Array<Date>`

```javascript
define(
  'Number is between 1 and 3',
  2,
  {between: [1, 3]}
);

define(
  'Date is between last year and next year',
  new Date(),
  {between: [new Date([2015]), new Date([2016])]}
);
```
