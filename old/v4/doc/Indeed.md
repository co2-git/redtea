redtea
===

# Indeed

`indeed` lets you test your code with booleans. It returns true or false.

# Usage

```javascript
import {indeed} from 'redtea';

const foo = 2/2;

if (indeed(foo).is(1)) {
  // foo is 1
}
```

# Value check

You can compare values directly.

```javascript
const a = 1;
const b = 1;

indeed(a).is(b); // true
```

# Type check

Or you can compare types.

```javascript
indeed(1).is.a(Number);
indeed({}).is.an(Object);
indeed([]).is.an(Array);

class Foo {}

indeed(new Foo()).is.a(Foo);
```

# Negation

You can compare by negation.

```javascript
indeed(1).is.not(2);
indeed(true).is.not.a(Date);
```
