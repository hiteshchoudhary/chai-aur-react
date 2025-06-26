# react-property

[![NPM](https://nodei.co/npm/react-property.png)](https://nodei.co/npm/react-property/)

[![NPM version](https://img.shields.io/npm/v/react-property.svg)](https://www.npmjs.com/package/react-property)

HTML and SVG DOM properties used by [React](https://github.com/facebook/react). See [DOMProperty](https://github.com/facebook/react/blob/main/packages/react-dom/src/shared/DOMProperty.js) and [possibleStandardNames](https://github.com/facebook/react/blob/main/packages/react-dom/src/shared/possibleStandardNames.js).

Try [Replit](https://repl.it/@remarkablemark/react-property) demo.

## Install

```sh
npm install react-property
```

## Usage

Import module:

```js
// CommonJS
const reactProperty = require('react-property');

// ES Modules
import reactProperty from 'react-property';
```

Module contains:

```js
{
  BOOLEAN: 3,
  BOOLEANISH_STRING: 2,
  NUMERIC: 5,
  OVERLOADED_BOOLEAN: 4,
  POSITIVE_NUMERIC: 6,
  RESERVED: 0,
  STRING: 1,
  getPropertyInfo: [Function: getPropertyInfo],
  isCustomAttribute: [Function: bound test],
  possibleStandardNames: {
    accept: 'accept',
    acceptcharset: 'acceptCharset',
    'accept-charset': 'acceptCharset',
    // ...
  }
}
```

## License

MIT. See [license](https://github.com/facebook/react/blob/main/LICENSE) from original project.
