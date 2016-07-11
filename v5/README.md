redtea
===

```javascript

// ie, getNames('John Doe') => {first: 'John', last: 'Doe'}
function getNames(fullName) {
  const [first, last] = fullName.split(/\s+/);
  return {first, last};
}

describe('Get names',
  () => describe('Find first and last name',
    explain(getNames('John Doe'), {as: 'John Doe'}, it.is({
      first: 'John',
      last: 'Doe',
    }))
  )
);

explain(1, it.is.a.number)

const tests = [
  () => {},
  () => {throw new Error('Fails')},
  () =>
];
```
