redtea Asserting arrays
===

# Is type of array

```javascript
indeed([]).is.an(Array);
assuming([]).is.an(Array);
describe([], it.is.an(Array));
```

# Shorthand syntax

```javascript
indeed([]).is.an.array;
assuming([]).is.an.array;
describe([], it.is.an.array);
```

# Length

```javascript
indeed([1]).is.having.length;
indeed([1, 2]).is.having.length(2);
assuming([1]).is.having.length;
assuming([1, 2]).is.having.length(2);
describe([1], it.is.having.length);
describe([1, 2], it.is.having.length(2));
```

# Each

```javascript
indeed.each([1, 2]).is.a.number;
assuming.each([1, 2]).is.a.number;
describe.each([1, 2], it.is.a.number);
```
