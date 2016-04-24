redtea
===

`assuming` lets you test the assert way: an assertion error is thrown if assertion fails.

# Usage

```javascript
import {assuming} from 'redtea';
const foo = 2/2;

try {
  assuming(foo).is.a(Number);
  assuming(foo).is(1);
} catch (error) {}
```

# Value check

You can compare values.

```javascript
const a = 1;
const b = 1;

assuming(a).is(b); // no error thrown
```

# Type check

Or you can compare types.

```javascript
assuming(1).is.a(Number);
assuming({}).is.an(Object);
assuming([]).is.an(Array);

class Foo {}

assuming(new Foo()).is.a(Foo);
```

# Negation

You can compare by negation.

```javascript
assuming(1).is.not(2);
assuming(true).is.not.a(Date);
```
