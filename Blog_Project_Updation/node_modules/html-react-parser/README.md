# html-react-parser

[![NPM](https://nodei.co/npm/html-react-parser.png)](https://nodei.co/npm/html-react-parser/)

[![NPM version](https://badgen.net/npm/v/html-react-parser)](https://www.npmjs.com/package/html-react-parser)
[![Bundlephobia minified + gzip](https://badgen.net/bundlephobia/minzip/html-react-parser)](https://bundlephobia.com/package/html-react-parser)
[![Build Status](https://github.com/remarkablemark/html-react-parser/workflows/build/badge.svg?branch=master)](https://github.com/remarkablemark/html-react-parser/actions?query=workflow%3Abuild)
[![codecov](https://codecov.io/gh/remarkablemark/html-react-parser/branch/master/graph/badge.svg?token=wosFd1DBIR)](https://codecov.io/gh/remarkablemark/html-react-parser)
[![NPM downloads](https://badgen.net/npm/dm/html-react-parser)](https://www.npmjs.com/package/html-react-parser)
[![Discord](https://img.shields.io/discord/422421589582282752.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/njExwXdrRJ)

HTML to React parser that works on both the server (Node.js) and the client (browser):

```
HTMLReactParser(string[, options])
```

The parser converts an HTML string to one or more [React elements](https://reactjs.org/docs/react-api.html#creating-react-elements).

To replace an element with another element, check out the [`replace`](#replace) option.

#### Example

```js
const parse = require('html-react-parser');
parse('<p>Hello, World!</p>'); // React.createElement('p', {}, 'Hello, World!')
```

[Replit](https://replit.com/@remarkablemark/html-react-parser) | [JSFiddle](https://jsfiddle.net/remarkablemark/7v86d800/) | [CodeSandbox](https://codesandbox.io/s/940pov1l4w) | [TypeScript](https://codesandbox.io/s/html-react-parser-z0kp6) | [Examples](https://github.com/remarkablemark/html-react-parser/tree/master/examples)

<details>
<summary>Table of Contents</summary>

- [Install](#install)
- [Usage](#usage)
  - [replace](#replace)
    - [replace with TypeScript](#replace-with-typescript)
    - [replace element and children](#replace-element-and-children)
    - [replace element attributes](#replace-element-attributes)
    - [replace and remove element](#replace-and-remove-element)
  - [transform](#transform)
  - [library](#library)
  - [htmlparser2](#htmlparser2)
  - [trim](#trim)
- [Migration](#migration)
  - [v4](#v4)
  - [v3](#v3)
  - [v2](#v2)
  - [v1](#v1)
- [FAQ](#faq)
  - [Is this XSS safe?](#is-this-xss-safe)
  - [Does invalid HTML get sanitized?](#does-invalid-html-get-sanitized)
  - [Are `<script>` tags parsed?](#are-script-tags-parsed)
  - [Attributes aren't getting called](#attributes-arent-getting-called)
  - [Parser throws an error](#parser-throws-an-error)
  - [Is SSR supported?](#is-ssr-supported)
  - [Elements aren't nested correctly](#elements-arent-nested-correctly)
  - [Don't change case of tags](#dont-change-case-of-tags)
  - [TS Error: Property 'attribs' does not exist on type 'DOMNode'](#ts-error-property-attribs-does-not-exist-on-type-domnode)
  - [Can I enable `trim` for certain elements?](#can-i-enable-trim-for-certain-elements)
  - [Webpack build warnings](#webpack-build-warnings)
  - [TypeScript error](#typescript-error)
- [Performance](#performance)
- [Contributors](#contributors)
  - [Code Contributors](#code-contributors)
  - [Financial Contributors](#financial-contributors)
    - [Individuals](#individuals)
    - [Organizations](#organizations)
- [Support](#support)
- [License](#license)

</details>

## Install

[NPM](https://www.npmjs.com/package/html-react-parser):

```sh
npm install html-react-parser --save
```

[Yarn](https://yarnpkg.com/package/html-react-parser):

```sh
yarn add html-react-parser
```

[CDN](https://unpkg.com/html-react-parser/):

```html
<!-- HTMLReactParser depends on React -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/html-react-parser@latest/dist/html-react-parser.min.js"></script>
<script>
  window.HTMLReactParser(/* string */);
</script>
```

## Usage

Import ES module:

```js
import parse from 'html-react-parser';
```

Or require CommonJS module:

```js
const parse = require('html-react-parser');
```

Parse single element:

```js
parse('<h1>single</h1>');
```

Parse multiple elements:

```js
parse('<li>Item 1</li><li>Item 2</li>');
```

Make sure to render parsed adjacent elements under a parent element:

```jsx
<ul>
  {parse(`
    <li>Item 1</li>
    <li>Item 2</li>
  `)}
</ul>
```

Parse nested elements:

```js
parse('<body><p>Lorem ipsum</p></body>');
```

Parse element with attributes:

```js
parse(
  '<hr id="foo" class="bar" data-attr="baz" custom="qux" style="top:42px;">'
);
```

### replace

The `replace` option allows you to replace an element with another element.

The `replace` callback's first argument is [domhandler](https://github.com/fb55/domhandler#example)'s node:

```js
parse('<br>', {
  replace: (domNode) => {
    console.dir(domNode, { depth: null });
  }
});
```

<details>
<summary>Console output</summary>
<p>

```js
Element {
  type: 'tag',
  parent: null,
  prev: null,
  next: null,
  startIndex: null,
  endIndex: null,
  children: [],
  name: 'br',
  attribs: {}
}
```

</p>
</details>

The element is replaced if a **valid** React element is returned:

```jsx
parse('<p id="replace">text</p>', {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.id === 'replace') {
      return <span>replaced</span>;
    }
  }
});
```

#### replace with TypeScript

For TypeScript projects, you may need to check that `domNode` is an instance of domhandler's `Element`:

```tsx
import { HTMLReactParserOptions, Element } from 'html-react-parser';

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      // ...
    }
  }
};
```

If you're having issues take a look at our [Create React App example](./examples/create-react-app-typescript/src/App.tsx).

#### replace element and children

Replace the element and its children (see [demo](https://replit.com/@remarkablemark/html-react-parser-replace-example)):

```jsx
import parse, { domToReact } from 'html-react-parser';

const html = `
  <p id="main">
    <span class="prettify">
      keep me and make me pretty!
    </span>
  </p>
`;

const options = {
  replace: ({ attribs, children }) => {
    if (!attribs) {
      return;
    }

    if (attribs.id === 'main') {
      return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
    }

    if (attribs.class === 'prettify') {
      return (
        <span style={{ color: 'hotpink' }}>
          {domToReact(children, options)}
        </span>
      );
    }
  }
};

parse(html, options);
```

<details>
<summary>HTML output</summary>
<p>

<!-- prettier-ignore-start -->

```html
<h1 style="font-size:42px">
  <span style="color:hotpink">
    keep me and make me pretty!
  </span>
</h1>
```

<!-- prettier-ignore-end -->

</p>
</details>

#### replace element attributes

Convert DOM attributes to React props with `attributesToProps`:

```jsx
import parse, { attributesToProps } from 'html-react-parser';

const html = `
  <main class="prettify" style="background: #fff; text-align: center;" />
`;

const options = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.name === 'main') {
      const props = attributesToProps(domNode.attribs);
      return <div {...props} />;
    }
  }
};

parse(html, options);
```

<details>
<summary>HTML output</summary>
<p>

```html
<div class="prettify" style="background:#fff;text-align:center"></div>
```

</p>
</details>

#### replace and remove element

[Exclude](https://replit.com/@remarkablemark/html-react-parser-56) an element from rendering by replacing it with `<React.Fragment>`:

```jsx
parse('<p><br id="remove"></p>', {
  replace: ({ attribs }) => attribs && attribs.id === 'remove' && <></>
});
```

<details>
<summary>HTML output</summary>
<p>

```html
<p></p>
```

</p>
</details>

### transform

The `transform` option allows you to transform each element individually after it's parsed.

The `transform` callback's first argument is the React element:

```jsx
parse('<br>', {
  transform: (reactNode, domNode, index) => {
    // this will wrap every element in a div
    return <div>{reactNode}</div>;
  }
});
```

### library

The `library` option specifies the UI library. The default library is **React**.

To use Preact:

```js
parse('<br>', {
  library: require('preact')
});
```

Or a custom library:

```js
parse('<br>', {
  library: {
    cloneElement: () => {
      /* ... */
    },
    createElement: () => {
      /* ... */
    },
    isValidElement: () => {
      /* ... */
    }
  }
});
```

### htmlparser2

> **Warning**: `htmlparser2` options _**do not** work on the client-side_ (browser) and the options _**only work** on the server-side_ (Node.js). By overriding the options, it could cause universal rendering to break.

Default [htmlparser2 options](https://github.com/fb55/htmlparser2/wiki/Parser-options#option-xmlmode) can be overridden in >=[0.12.0](https://github.com/remarkablemark/html-react-parser/tree/v0.12.0).

To enable [`xmlMode`](https://github.com/fb55/htmlparser2/wiki/Parser-options#option-xmlmode):

```js
parse('<p /><p />', {
  htmlparser2: {
    xmlMode: true
  }
});
```

### trim

By default, whitespace is preserved:

```js
parse('<br>\n'); // [React.createElement('br'), '\n']
```

But certain elements like `<table>` will strip out invalid whitespace:

```js
parse('<table>\n</table>'); // React.createElement('table')
```

To remove whitespace, enable the `trim` option:

```js
parse('<br>\n', { trim: true }); // React.createElement('br')
```

However, intentional whitespace may be stripped out:

```js
parse('<p> </p>', { trim: true }); // React.createElement('p')
```

## Migration

### v4

[htmlparser2](https://github.com/fb55/htmlparser2) has been upgraded to [v9](https://github.com/fb55/htmlparser2/releases/tag/v9.0.0).

### v3

[domhandler](https://github.com/fb55/domhandler) has been upgraded to v5 so some [parser options](https://github.com/fb55/htmlparser2/wiki/Parser-options) like `normalizeWhitespace` have been removed.

Also, it's recommended to upgrade to the latest version of [TypeScript](https://www.npmjs.com/package/typescript).

### v2

Since [v2.0.0](https://github.com/remarkablemark/html-react-parser/releases/tag/v2.0.0), Internet Explorer (IE) is no longer supported.

### v1

TypeScript projects will need to update the types in [v1.0.0](https://github.com/remarkablemark/html-react-parser/releases/tag/v1.0.0).

For the `replace` option, you may need to do the following:

```tsx
import { Element } from 'domhandler/lib/node';

parse('<br class="remove">', {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs.class === 'remove') {
      return <></>;
    }
  }
});
```

Since [v1.1.1](https://github.com/remarkablemark/html-react-parser/releases/tag/v1.1.1), Internet Explorer 9 (IE9) is no longer supported.

## FAQ

### Is this XSS safe?

No, this library is _**not**_ [XSS (cross-site scripting)](https://wikipedia.org/wiki/Cross-site_scripting) safe. See [#94](https://github.com/remarkablemark/html-react-parser/issues/94).

### Does invalid HTML get sanitized?

No, this library does _**not**_ sanitize HTML. See [#124](https://github.com/remarkablemark/html-react-parser/issues/124), [#125](https://github.com/remarkablemark/html-react-parser/issues/125), and [#141](https://github.com/remarkablemark/html-react-parser/issues/141).

### Are `<script>` tags parsed?

Although `<script>` tags and their contents are rendered on the server-side, they're not evaluated on the client-side. See [#98](https://github.com/remarkablemark/html-react-parser/issues/98).

### Attributes aren't getting called

The reason why your HTML attributes aren't getting called is because [inline event handlers](https://developer.mozilla.org/docs/Web/Guide/Events/Event_handlers) (e.g., `onclick`) are parsed as a _string_ rather than a _function_. See [#73](https://github.com/remarkablemark/html-react-parser/issues/73).

### Parser throws an error

If the parser throws an error, check if your arguments are valid. See ["Does invalid HTML get sanitized?"](#does-invalid-html-get-sanitized).

### Is SSR supported?

Yes, server-side rendering on Node.js is supported by this library. See [demo](https://replit.com/@remarkablemark/html-react-parser-SSR).

### Elements aren't nested correctly

If your elements are nested incorrectly, check to make sure your [HTML markup is valid](https://validator.w3.org/). The HTML to DOM parsing will be affected if you're using self-closing syntax (`/>`) on non-void elements:

```js
parse('<div /><div />'); // returns single element instead of array of elements
```

See [#158](https://github.com/remarkablemark/html-react-parser/issues/158).

### Don't change case of tags

Tags are lowercased by default. To prevent that from happening, pass the [htmlparser2 option](#htmlparser2):

```js
const options = {
  htmlparser2: {
    lowerCaseTags: false
  }
};
parse('<CustomElement>', options); // React.createElement('CustomElement')
```

> **Warning**: By preserving case-sensitivity of the tags, you may get rendering warnings like:
>
> ```
> Warning: <CustomElement> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
> ```

See [#62](https://github.com/remarkablemark/html-react-parser/issues/62) and [example](https://replit.com/@remarkablemark/html-react-parser-62).

### TS Error: Property 'attribs' does not exist on type 'DOMNode'

The TypeScript error occurs because `DOMNode` needs to be an instance of domhandler's `Element`. See [migration](#migration) or [#199](https://github.com/remarkablemark/html-react-parser/issues/199).

### Can I enable `trim` for certain elements?

Yes, you can enable or disable [`trim`](#trim) for certain elements using the [`replace`](#replace) option. See [#205](https://github.com/remarkablemark/html-react-parser/issues/205).

### Webpack build warnings

If you see the Webpack build warning:

```
export 'default' (imported as 'parse') was not found in 'html-react-parser'
```

Then update your Webpack config to:

```js
// webpack.config.js
module.exports = {
  // ...
  resolve: {
    mainFields: ['browser', 'main', 'module']
  }
};
```

See [#238](https://github.com/remarkablemark/html-react-parser/issues/238) and [#213](https://github.com/remarkablemark/html-react-parser/issues/213).

### TypeScript error

If you see the TypeScript error:

```
node_modules/htmlparser2/lib/index.d.ts:2:23 - error TS1005: ',' expected.

2 export { Parser, type ParserOptions };
                        ~~~~~~~~~~~~~
```

Then upgrade to the latest version of [typescript](https://www.npmjs.com/package/typescript). See [#748](https://github.com/remarkablemark/html-react-parser/issues/748).

## Performance

Run benchmark:

```sh
npm run test:benchmark
```

Output of benchmark run on MacBook Pro 2017:

```
html-to-react - Single x 415,186 ops/sec ±0.92% (85 runs sampled)
html-to-react - Multiple x 139,780 ops/sec ±2.32% (87 runs sampled)
html-to-react - Complex x 8,118 ops/sec ±2.99% (82 runs sampled)
```

Run [Size Limit](https://github.com/ai/size-limit):

```sh
npx size-limit
```

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](https://github.com/remarkablemark/html-react-parser/blob/master/.github/CONTRIBUTING.md)].

[![Code Contributors](https://opencollective.com/html-react-parser/contributors.svg?width=890&button=false)](https://github.com/remarkablemark/html-react-parser/graphs/contributors)

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/html-react-parser/contribute)]

#### Individuals

[![Financial Contributors - Individuals](https://opencollective.com/html-react-parser/individuals.svg?width=890)](https://opencollective.com/html-react-parser)

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/html-react-parser/contribute)]

[![Financial Contributors - Organization 0](https://opencollective.com/html-react-parser/organization/0/avatar.svg)](https://opencollective.com/html-react-parser/organization/0/website)
[![Financial Contributors - Organization 1](https://opencollective.com/html-react-parser/organization/1/avatar.svg)](https://opencollective.com/html-react-parser/organization/1/website)
[![Financial Contributors - Organization 2](https://opencollective.com/html-react-parser/organization/2/avatar.svg)](https://opencollective.com/html-react-parser/organization/2/website)
[![Financial Contributors - Organization 3](https://opencollective.com/html-react-parser/organization/3/avatar.svg)](https://opencollective.com/html-react-parser/organization/3/website)
[![Financial Contributors - Organization 4](https://opencollective.com/html-react-parser/organization/4/avatar.svg)](https://opencollective.com/html-react-parser/organization/4/website)
[![Financial Contributors - Organization 5](https://opencollective.com/html-react-parser/organization/5/avatar.svg)](https://opencollective.com/html-react-parser/organization/5/website)
[![Financial Contributors - Organization 6](https://opencollective.com/html-react-parser/organization/6/avatar.svg)](https://opencollective.com/html-react-parser/organization/6/website)
[![Financial Contributors - Organization 7](https://opencollective.com/html-react-parser/organization/7/avatar.svg)](https://opencollective.com/html-react-parser/organization/7/website)
[![Financial Contributors - Organization 8](https://opencollective.com/html-react-parser/organization/8/avatar.svg)](https://opencollective.com/html-react-parser/organization/8/website)
[![Financial Contributors - Organization 9](https://opencollective.com/html-react-parser/organization/9/avatar.svg)](https://opencollective.com/html-react-parser/organization/9/website)

## Support

- [GitHub Sponsors](https://b.remarkabl.org/github-sponsors)
- [Open Collective](https://b.remarkabl.org/open-collective-html-react-parser)
- [Tidelift](https://b.remarkabl.org/tidelift-html-react-parser)
- [Patreon](https://b.remarkabl.org/patreon)
- [Ko-fi](https://b.remarkabl.org/ko-fi)
- [Liberapay](https://b.remarkabl.org/liberapay)
- [Teespring](https://b.remarkabl.org/teespring)

## License

[MIT](https://github.com/remarkablemark/html-react-parser/blob/master/LICENSE)
