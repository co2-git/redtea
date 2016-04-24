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

# Is

`is` the core library of `redtea`. It uses [should.js](https://shouldjs.github.io/) as an assertion engine (*this is subject to change*).
You'll note that `assuming` is basically just a sugar for `is`.

```javascript
import {is} from 'redtea';
const foo = 1;
is(foo, 1);
is(foo, 2); // throws assertion error
is.type(foo, Number);
is.type(foo, String); // throws assertion error
```
