redtea Asserting errors
===

# Is type of error

```javascript
indeed(new Error('...')).is.an(Error);
assuming(new Error('...')).is.an(Error);
describe(new Error('...'), it.is.an(Error));
```

# Shorthand syntax

```javascript
indeed(new Error('...').is.an.error;
assuming(new Error('...').is.an.error;
describe(new Error('...', it.is.an.error);
```

# Throw

```javascript
function foo() {
  throw new TypeError('...');
}

indeed(foo()).is.throwing;
indeed(foo()).is.throwing(TypeError);
assuming(foo()).is.throwing;
assuming(foo()).is.throwing(TypeError);
describe(foo(), it.is.throwing);
describe(foo(), it.is.throwing(TypeError));
```
