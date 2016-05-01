redtea Asserting objects
===

# Is type of object

```javascript
indeed({}).is.an(Object);
assuming({}).is.an(Object);
describe({}, it.is.an(Object));
```

# Shorthand syntax

```javascript
indeed({}).is.an.object;
assuming({}).is.an.object;
describe({}, it.is.an.object);
```

# Property

```javascript
indeed({foo: 1}).is.having.property('foo');
assuming({foo: 1}).is.having.property('foo');
describe({foo: 1}, it.is.having.property('foo'));
```

# Own property

```javascript
indeed({foo: 1}).is.having.own.property('foo');
assuming({foo: 1}).is.having.own.property('foo');
describe({foo: 1}, it.is.having.own.property('foo'));
```

# Enumerable property

```javascript
indeed({foo: 1}).is.having.enumerable.property('foo');
assuming({foo: 1}).is.having.enumerable.property('foo');
describe({foo: 1}, it.is.having.enumerable.property('foo'));
```

# Property describer

Since we don't support chaining, you would do it like this:

```javascript
indeed({foo: 1}.foo).is.(1);
assuming({foo: 1}.foo).is(1);
describe({foo: 1}.foo, it.is(1));
```
