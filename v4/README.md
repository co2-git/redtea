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

if (indeed(foo).is(1)) {
  console.log('Yeah!');
}
```

Read more about [indeed](doc/Indeed.md).
