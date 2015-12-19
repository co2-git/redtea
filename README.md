redtea
===

A test framework for Node based on re-usability.

# Install

```bash
npm install -g redtea
```

# Usage

```js
import describe from 'redtea';
// we use should, but you can use any assertion framework
import should from 'should';

const foo = () => new Promise(resolve => resolve(1));

describe('foo' , it => {

  // Synchronous
  it('should be a function', () => foo.should.be.a.Function());

  // Asynchronous
  it('should resolve to 1', () => new Promise((resolve, reject) => {
    foo().then(
      resolved => {
        resolved.should.be.exactly(1);
        resolve();
      },
      reject
    );
  }));

  // Nested
  it('should nest', it => {

    it('should be nested', () => true);

  });
});

// describe returns a promise, so it can be chained and will return a stat object

describe('foo', it => it('should be ok', () => true.should.be.true()))
  .then(stats => {
    console.log(stats); // { tests : 1, passed : 1, failed : 0, time : 4 }
  });
```

# Helper functions

Functions that are meant to be re-used - example in an array

```js
const foos = [1, 2, 3, 4];

function isFoo (foo) {
  return it => {
    it('should be a number', () => foo.should.be.a.Number());
  };
}

describe('foos' , it => {

  foos.forEach(foo => it('should be a foo', it => isFoo(foo)(it)));

});
```

# CLI

You can invoke directly any file with the CLI provided it is encapsulated in a function such as:

```js
// test.js
import describe from 'redtea';

function test (props) {
  return describe('My test', it => { /*...*/} );
}

export default test;
```

You can now invoke the file  via the cli:

```bash
redtea test.js
```
