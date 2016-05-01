redtea Asserting strings
===

# Is type of string

```javascript
indeed('abc').is.a(String);
assuming('abc').is.a(String);
describe('abc', it.is.a(String));
```

# Shorthand syntax

```javascript
indeed('abc').is.a.string;
assuming('abc').is.a.string;
describe('abc', it.is.a.string);
```

# Equal

```javascript
indeed('abc').is('abc');
assuming('abc').is('abc');
describe('abc', it.is('abc'));
```

# Starts with

```javascript
indeed('abc').is.starting.with('a');
assuming('abc').is.starting.with('a');
describe('abc', it.is.starting.with('a'));
```

# Ends with

```javascript
indeed('abc').is.ending.with('c');
assuming('abc').is.ending.with('c');
describe('abc', it.is.ending.with('c'));
```

# Matches

```javascript
indeed('abc').is.matching(/a/);
assuming('abc').is.matching(/a/);
describe('abc', it.is.matching(/a/));
```
