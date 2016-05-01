redtea Asserting numbers
===

# Is type of number

```javascript
indeed(6).is.a(Number);
assuming(6).is.a(Number);
describe(6, it.is.a(Number));
```

# Shorthand syntax

```javascript
indeed(6).is.a.number;
assuming(6).is.a.number;
describe(6, it.is.a.number);
```

# Equal

```javascript
indeed(6).is(6);
assuming(6).is(6);
describe(6, it.is(6));
```

# Above

```javascript
indeed(6).is.above(5);
assuming(6).is.above(5);
describe(6, it.is.above(5));
```

# Below

```javascript
indeed(6).is.below(7);
assuming(6).is.below(7);
describe(6, it.is.below(7));
```

# Between

```javascript
indeed(6).is.between(5, 7);
assuming(6).is.between(5, 7);
describe(6, it.is.between(5, 7));
```
