# html-dom-parser

[![NPM](https://nodei.co/npm/html-dom-parser.png)](https://nodei.co/npm/html-dom-parser/)

[![NPM version](https://badgen.net/npm/v/html-dom-parser)](https://www.npmjs.com/package/html-dom-parser)
[![Bundlephobia minified + gzip](https://badgen.net/bundlephobia/minzip/html-dom-parser)](https://bundlephobia.com/package/html-dom-parser)
[![Build Status](https://github.com/remarkablemark/html-dom-parser/workflows/build/badge.svg?branch=master)](https://github.com/remarkablemark/html-dom-parser/actions?query=workflow%3Abuild)
[![codecov](https://codecov.io/gh/remarkablemark/html-dom-parser/branch/master/graph/badge.svg?token=6RRL0875TY)](https://codecov.io/gh/remarkablemark/html-dom-parser)
[![NPM downloads](https://badgen.net/npm/dm/html-dom-parser)](https://www.npmjs.com/package/html-dom-parser)

HTML to DOM parser that works on both the server (Node.js) and the client (browser):

```
HTMLDOMParser(string[, options])
```

The parser converts an HTML string to a JavaScript object that describes the DOM tree.

#### Example

```js
const parse = require('html-dom-parser');
parse('<p>Hello, World!</p>');
```

Output:

```js
[
  Element {
    type: 'tag',
    parent: null,
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    children: [
      Text {
        type: 'text',
        parent: [Circular],
        prev: null,
        next: null,
        startIndex: null,
        endIndex: null,
        data: 'Hello, World!'
      }
    ],
    name: 'p',
    attribs: {}
  }
]
```

[Replit](https://replit.com/@remarkablemark/html-dom-parser) | [JSFiddle](https://jsfiddle.net/remarkablemark/ff9yg1yz/) | [Examples](https://github.com/remarkablemark/html-dom-parser/tree/master/examples)

## Install

[NPM](https://www.npmjs.com/package/html-dom-parser):

```sh
npm install html-dom-parser --save
```

[Yarn](https://yarnpkg.com/package/html-dom-parser):

```sh
yarn add html-dom-parser
```

[CDN](https://unpkg.com/html-dom-parser/):

```html
<script src="https://unpkg.com/html-dom-parser@latest/dist/html-dom-parser.min.js"></script>
<script>
  window.HTMLDOMParser(/* string */);
</script>
```

## Usage

Import or require the module:

```js
// ES Modules
import parse from 'html-dom-parser';

// CommonJS
const parse = require('html-dom-parser');
```

Parse empty string:

```js
parse('');
```

Output:

<!-- prettier-ignore -->
```js
[]
```

Parse string:

```js
parse('Hello, World!');
```

```js
[
  Text {
    type: 'text',
    parent: null,
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    data: 'Hello, World!'
  }
]
```

Parse element with attributes:

```js
parse('<p class="foo" style="color: #bada55">Hello, <em>world</em>!</p>');
```

Output:

```js
[
  Element {
    type: 'tag',
    parent: null,
    prev: null,
    next: null,
    startIndex: null,
    endIndex: null,
    children: [ [Text], [Element], [Text] ],
    name: 'p',
    attribs: { class: 'foo', style: 'color: #bada55' }
  }
]
```

The server parser is a wrapper of [htmlparser2](https://github.com/fb55/htmlparser2) `parseDOM` but with the root parent node excluded. The next section shows the available options you can use with the server parse.

The client parser mimics the server parser by using the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) API to parse the HTML string.

## Options (server only)

Because the server parser is a wrapper of [htmlparser2](https://github.com/fb55/htmlparser2), which implements [domhandler](https://github.com/fb55/domhandler), you can alter how the server parser parses your code with the following options:

```js
/**
 * These are the default options being used if you omit the optional options object.
 * htmlparser2 will use the same options object for its domhandler so the options
 * should be combined into a single object like so:
 */
const options = {
    /**
     * Options for the domhandler class.
     * https://github.com/fb55/domhandler/blob/master/src/index.ts#L16
     */
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false,
    /**
     * Options for the htmlparser2 class.
     * https://github.com/fb55/htmlparser2/blob/master/src/Parser.ts#L104
     */ 
    xmlMode: false, // Will overwrite what is used for the domhandler, otherwise inherited.
    decodeEntities: true,
    lowerCaseTags: true, // !xmlMode by default
    lowerCaseAttributeNames: true, // !xmlMode by default
    recognizeCDATA: false, // xmlMode by default
    recognizeSelfClosing: false, // xmlMode by default
    Tokenizer: Tokenizer
};
```

If you are parsing HTML with SVG code you can set `lowerCaseTags` to `true` without having to enable `xmlMode`. Keep in mind this will return all tag names in camel-case and not the HTML standard of lowercase.

**Note**: If you are parsing code client-side (in-browser), you can not control the parsing options. Client-side parsing automatically handles returning some HTML tags in camel-case, such as specific SVG elements, but returns all other tags lowercased according to the HTML standard.

## Testing

Run server and client tests:

```sh
npm test
```

Generate HTML coverage report for server tests:

```sh
npx nyc report --reporter=html
```

Lint files:

```sh
npm run lint
npm run lint:fix
```

Test TypeScript declaration file for style and correctness:

```sh
npm run lint:dts
```

## Migration

### v3.0.0

[domhandler](https://github.com/fb55/domhandler) has been upgraded to v5 so some [parser options](https://github.com/fb55/htmlparser2/wiki/Parser-options) like `normalizeWhitespace` have been removed.

## Release

Release and publish are automated by [Release Please](https://github.com/googleapis/release-please).

## Special Thanks

- [Contributors](https://github.com/remarkablemark/html-dom-parser/graphs/contributors)
- [htmlparser2](https://github.com/fb55/htmlparser2)
- [domhandler](https://github.com/fb55/domhandler)

## License

[MIT](https://github.com/remarkablemark/html-dom-parser/blob/master/LICENSE)
