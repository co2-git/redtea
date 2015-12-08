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
  return describe('life' , it => {
    it('should be a party', fulfill => fulfill());

    it.describe('should nest', it => {
      it('should fulfill', fulfill => fulfill())
    });
  });
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
