# asynciterator.prototype <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

`AsyncIterator.prototype`, or a shared object to use.

## Usage

```javascript
var asyncIterProto = require('asynciterator.prototype');
var assert = require('assert');

if (typeof AsyncIterator === 'function') {
    assert.equal(AsyncIterator.prototype, asyncIterProto);
}
```

[package-url]: https://npmjs.org/package/asynciterator.prototype
[npm-version-svg]: https://versionbadg.es/ljharb/AsyncIterator.prototype.svg
[deps-svg]: https://david-dm.org/ljharb/AsyncIterator.prototype.svg
[deps-url]: https://david-dm.org/ljharb/AsyncIterator.prototype
[dev-deps-svg]: https://david-dm.org/ljharb/AsyncIterator.prototype/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/AsyncIterator.prototype#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/asynciterator.prototype.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/asynciterator.prototype.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/asynciterator.prototype.svg
[downloads-url]: https://npm-stat.com/charts.html?package=asynciterator.prototype
[codecov-image]: https://codecov.io/gh/ljharb/AsyncIterator.prototype/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/AsyncIterator.prototype/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/ljharb/AsyncIterator.prototype
[actions-url]: https://github.com/AsyncIterator/iterator.prototype/actions
