redtea
===

Extensive test framework in JavaScript. Different levels of testing offered:

- true/false assertions
- error throwing assertions
- *promisable* assertions
- TDD interface with CLI support

**! [v3 doc here](https://github.com/co2-git/redtea/tree/25e97338ead5c53683f4e9ee9a5fb19428a411bb)**

# Indeed

`indeed` lets you return `true` or `false`.

```javascript
import {indeed} from 'redtea';
const foo = 2/2;

if (indeed(foo).is.a(Number) && indeed(foo).is(1)) {
  console.log('√ passed');
}
```

Read more about [indeed](doc/Indeed.md).

# Assuming

`assuming` lets you test the assert way: an assertion error is thrown if assertion fails.

```javascript
import {assuming} from 'redtea';
const foo = 2/2;

try {
  assuming(foo).is.a(Number);
  assuming(foo).is(1);
} catch (error) {}
```

Read more about [assuming](doc/Assuming.md).

# Describe

`describe` lets you run an assertion inside a Promise.
It uses a TDD syntax and returns a promise so you can stack it.

```javascript
import {describe, it} from 'redtea';

describe(true, it.is.a(Boolean), it.is(true)).then().catch();
```

## Promises

You can easily asserts what is returned by promises.

```javascript
const myPromise = new Promise((resolve) => resolve(42));

describe(myPromise, it.is(42));
```

You can also assert rejections.

```javascript
const myPromise = new Promise((resolve, reject) => reject(new Error('...')));

describe(myPromise, it.is.an(Error));
```

## Events

You can also assert events. It will listen to events.

```javascript
const emitter = new EventEmitter();

process.nextTick(() => emitter.emits('foo', 1, 2));

describe(emitter,
  it.emits('foo',
    (num1) => describe(num1, it.is(1)),
    (num1, num2) => describe(num2, it.is(2)),
  ),
  it.does.not.emit('error')
);
```

# CLI

We ship with a cli.

```javascript
// test.js
import {describe, it} from 'redtea';

export default () => describe.batch('My tests',
  () => describe(true, it.is(true)),
  () => describe(false, it.is.not(true), it.is(false)),
  () => describe.batch('Nested test',
    () => describe(22, it.is.a(Number))
  )
);

```

From your terminal:

```bash
redtea test.js
```

# Is

`is` the core library of `redtea`. It performs basic synchronous value/type comparison and returns an object. `assuming` is basically a sugar for `is`.

```javascript
import {is} from 'redtea';
const foo = 1;
is(foo, 1);
{label: "number 1 is number 1", subject: foo, value: 1, passed: true}
is(foo, 2);
{label: "number 1 is number 1", subject: foo, value: 1, passed: false}
is.type(foo, Number);
{label: "number 1 is number 1", subject: foo, type: Number, passed: true}
is.type(foo, String);
{label: "number 1 is number 1", subject: foo, type: String, passed: false}
```
