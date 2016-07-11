redtea
===

# Command line

```javascript
// test.js
import {describe, it} from 'redtea';

export default describe.batch(
  'My tests',
    describe('Number', 1, {type: Number}),
    describe('String', '', {value: ''}),
);
```

```bash
sudo npm install --global redtea
redtea test.js
```
