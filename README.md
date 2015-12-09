redtea
===

A test framework for Node based on promise, es6 and re-usability.

# Install

```bash
npm install -g redtea
```
# Use with cli

```js
import describe from 'redtea';

function test (props) {
  return describe('life' , it => it('should be a party', fulfill => fulfill()));
}

export default test;
```

```bash
redtea
```

By default, it will scan test directory. You can specify another directory:

```bash
redtea some/other/directory
```

# Usage

redtea is promise-based, so assertions need to fulfill.

```js
import describe from 'redtea';
// we use should, but you can use any assertion framework
import should from 'should';

// variable to test

function foo () {
  return new Promise(fulfill => fulfill(true));
}

function test (props) {
  const locals = {};

  return describe('foo' , it => {

    it('should be a function', fulfill => {
      foo.should.be.a.Function();
      fulfill();
    });

    it('should be a promise', fulfill => {
      locals.promise = foo();
      locals.promise.should.be.an.instanceof(Promise);
      fulfill();
    });

    it('should fulfill', (fulfill, reject) => {
      locals.promise.then(
        results => {
          locals.results = results;
          fulfill();
        },
        reject
      );
    });

    it('should be a function', fulfill => {
      locals.results.should.be.true();
      fulfill();
    });

  });
}

export default test;
```
