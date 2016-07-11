redtea Asserting classes
===

```javascript
class A {}
class B extends A {}
```

# Is a class

```javascript
indeed(A).is.a.class;
assuming(A).is.a.class;
describe(A, it.is.a.class);
```

# Extends

```javascript
indeed(B).is.extending(A);
assuming(B).is.extending(A);
describe(B, it.is.extending(A));
```

# Instances

```javascript
indeed(new A()).is.an(A);
assuming(new A()).is.an(A);
describe(new A(), it.is.an(A));
```
