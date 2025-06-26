# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.15](https://github.com/es-shims/iterator-helpers/compare/v1.0.14...v1.0.15) - 2023-09-13

### Commits

- [New] add `Iterator.prototype` shim [`c4a6203`](https://github.com/es-shims/iterator-helpers/commit/c4a6203a0ac87bf0a33835e775c207ff1911225d)
- [Tests] add passing tests for native generators [`57bae8c`](https://github.com/es-shims/iterator-helpers/commit/57bae8ccbeb27ed0e6c449f35cddbda6cf6757e8)
- [Deps] update `define-properties`, `iterator.prototype`, `safe-array-concat` [`56ca087`](https://github.com/es-shims/iterator-helpers/commit/56ca087f924dbefee47f0a1cb3b8468de76cd234)

## [v1.0.14](https://github.com/es-shims/iterator-helpers/compare/v1.0.13...v1.0.14) - 2023-08-26

### Commits

- [Deps] update `es-abstract` [`477b123`](https://github.com/es-shims/iterator-helpers/commit/477b1233acd36fdbbccd79fbb69cde325bc3e6a9)
- [Dev Deps] update `aud`, `eslint-plugin-import`, `tape` [`e4ea414`](https://github.com/es-shims/iterator-helpers/commit/e4ea4146feffb72fd828e5d883e960e0ad589a35)

## [v1.0.13](https://github.com/es-shims/iterator-helpers/compare/v1.0.12...v1.0.13) - 2023-08-16

### Fixed

- [Deps] add missing deps; add eslint-plugin-import [`#3`](https://github.com/es-shims/iterator-helpers/issues/3)

## [v1.0.12](https://github.com/es-shims/iterator-helpers/compare/v1.0.11...v1.0.12) - 2023-07-14

### Commits

- [Fix] avoid creating string wrapper objects with sloppy mode flatMap mappers [`db16b34`](https://github.com/es-shims/iterator-helpers/commit/db16b34aec554934ec2bfd62629fb66cebc311f8)
- [Deps] update `es-abstract` [`f002147`](https://github.com/es-shims/iterator-helpers/commit/f002147f0afbb2cd7c2d2e1207685f52e33abf0f)
- [Dev Deps] update `@ljharb/eslint-config`, `aud [`42064e8`](https://github.com/es-shims/iterator-helpers/commit/42064e80e0cc37f5e4676c2133dacae7456e313f)
- [meta] fix tidelift funding identifier [`896fd4f`](https://github.com/es-shims/iterator-helpers/commit/896fd4f2e4b419945bfbd85024a2c96248323151)

## [v1.0.11](https://github.com/es-shims/iterator-helpers/compare/v1.0.10...v1.0.11) - 2023-05-22

### Commits

- [Fix] iterator helpers are not a constructor [`8a7f999`](https://github.com/es-shims/iterator-helpers/commit/8a7f9996ba3600ef30f3a9c75f9f994e88d075c6)

## [v1.0.10](https://github.com/es-shims/iterator-helpers/compare/v1.0.9...v1.0.10) - 2023-05-18

### Commits

- [patch] remove IsCallable check on NextMethod, deferring errors to callsite [`bbb7efa`](https://github.com/es-shims/iterator-helpers/commit/bbb7efac8349273fe17c86194ef13af45bcb8e24)
- [patch] change Symbol.iterator fallback from callable check to nullish check [`ec3e255`](https://github.com/es-shims/iterator-helpers/commit/ec3e255dfe30ea6650d8a697e6c4f16fa393e923)
- [Tests] add test cases [`5117c47`](https://github.com/es-shims/iterator-helpers/commit/5117c477348407ebdfc9410dd437a68634c39a8e)
- [Dev Deps] update `@es-shims/api` [`9fa13a0`](https://github.com/es-shims/iterator-helpers/commit/9fa13a0739f353536de58b2b648aa9eacfa49479)
- [Dev Deps] update `@es-shims/api` [`b74b0ac`](https://github.com/es-shims/iterator-helpers/commit/b74b0ac2bd7e920f760bae7ba7c6c5310f5123d8)

## [v1.0.9](https://github.com/es-shims/iterator-helpers/compare/v1.0.8...v1.0.9) - 2023-05-02

### Commits

- [Refactor] use 2022 AO instead of 2015 AO [`75ee5c4`](https://github.com/es-shims/iterator-helpers/commit/75ee5c4dea0037f02a61c240114bb6bd8c8b48f1)

## [v1.0.8](https://github.com/es-shims/iterator-helpers/compare/v1.0.7...v1.0.8) - 2023-05-02

### Commits

- [Fix] `flatMap`: close the inner iterator when applicable [`4dc94e0`](https://github.com/es-shims/iterator-helpers/commit/4dc94e0117e34b4c99f9ed96c4fe306896c47da1)

## [v1.0.7](https://github.com/es-shims/iterator-helpers/compare/v1.0.6...v1.0.7) - 2023-05-01

### Commits

- [Fix] `flatMap`: properly handle yielded iterables [`3a78767`](https://github.com/es-shims/iterator-helpers/commit/3a78767e86394d45b212a225e4253745f8b1dc8d)
- [Fix] `flatMap`: only increment the count when iterating the outer iterator [`955d0b0`](https://github.com/es-shims/iterator-helpers/commit/955d0b00f5660db0d9febef2a16426dfc32e8be4)

## [v1.0.6](https://github.com/es-shims/iterator-helpers/compare/v1.0.5...v1.0.6) - 2023-04-20

### Commits

- [Refactor] `GetIteratorFlattenable`: remove hint [`781fc7c`](https://github.com/es-shims/iterator-helpers/commit/781fc7c28615aaaef139cbcd9e6ade513419bea1)
- [Refactor] `GetIteratorFlattenable`: use `GetIteratorDirect` [`026118b`](https://github.com/es-shims/iterator-helpers/commit/026118b8c884adaee5ab0eb12de838ef9abdbb6f)
- [Refactor] use `safe-array-concat` [`1d985a4`](https://github.com/es-shims/iterator-helpers/commit/1d985a449be212523f05ba4a359a162931ddf3d3)

## [v1.0.5](https://github.com/es-shims/iterator-helpers/compare/v1.0.4...v1.0.5) - 2023-03-22

### Commits

- [Tests] add passing tests for 4240029 [`c2082fe`](https://github.com/es-shims/iterator-helpers/commit/c2082fee3e73dc1998a67fbe0014e3ebdceb8ec0)
- [Fix] properly allow subclasses of Iterator to be constructed [`5cebe2a`](https://github.com/es-shims/iterator-helpers/commit/5cebe2a5767393696d0ce4e9325edf78c300f938)

## [v1.0.4](https://github.com/es-shims/iterator-helpers/compare/v1.0.3...v1.0.4) - 2023-03-21

### Commits

- [Fix] validate arguments first [`4240029`](https://github.com/es-shims/iterator-helpers/commit/42400297454909ddccc899a012dc55bbd403eb8b)
- [Fix] close underlying iterator when helper is closed [`f5372c7`](https://github.com/es-shims/iterator-helpers/commit/f5372c78cafff64bfda5849386538f806916049a)
- [Tests] `Iterator`: remove an unnecessary call-bind [`7d0ba59`](https://github.com/es-shims/iterator-helpers/commit/7d0ba59f672e690b189f91e0348f6b5e00f934e1)

## [v1.0.3](https://github.com/es-shims/iterator-helpers/compare/v1.0.2...v1.0.3) - 2023-03-17

### Commits

- [Fix] `drop`/`filter`/`flatMap`/`map`/`take`: properly IfAbruptCloseIterator [`ff643a0`](https://github.com/es-shims/iterator-helpers/commit/ff643a0b7c4e5c2b00e794ba9b988b47e783f235)
- [Refactor] use `NormalCompletion`/`ThrowCompletion` instead of thunks [`68fd937`](https://github.com/es-shims/iterator-helpers/commit/68fd937b53c107481a9f868bda5b2bd5cbc00142)
- [Fix] `filter`: IteratorClose needs to rethrow the error [`200474f`](https://github.com/es-shims/iterator-helpers/commit/200474ff289dea77c696c0c025f4602405cf3fff)
- [Fix] `filter`: properly increment the counter [`14aa2d8`](https://github.com/es-shims/iterator-helpers/commit/14aa2d8b75fd16378c2be183fd5b008712547ed4)
- [Fix] `Iterator` can not be `new`ed or invoked directly [`6fbd68e`](https://github.com/es-shims/iterator-helpers/commit/6fbd68e778dd455c4aa63f4e1f39e0b583610509)
- [Fix] `Iterator.prototype` should be non-writable [`1080288`](https://github.com/es-shims/iterator-helpers/commit/108028858067e40ea56dca9a68dd6cea4966e904)
- [Deps] update `es-abstract` [`b7913da`](https://github.com/es-shims/iterator-helpers/commit/b7913da9cddef1ec40b4827821c6069019b79093)
- [Dev Deps] update `@es-shims/api` [`0071bed`](https://github.com/es-shims/iterator-helpers/commit/0071bed9e13231317d2cdb9ae0ecb6603784ad1f)

## [v1.0.2](https://github.com/es-shims/iterator-helpers/compare/v1.0.1...v1.0.2) - 2023-02-09

### Commits

- [Refactor] inline 2023 impls of Iterator AOs until es-abstract is published with them [`b9c80c5`](https://github.com/es-shims/iterator-helpers/commit/b9c80c5aba0deaaabef7e650fe7ec231fdc695e3)
- [Fix] ensure calling `.return` does not invoke the next iteration [`9e28ed5`](https://github.com/es-shims/iterator-helpers/commit/9e28ed5af44a660a0d2e80684cb9a4bf3d86e09a)
- [Fix] `map`: pass the proper index argument to the mapper [`125e3ca`](https://github.com/es-shims/iterator-helpers/commit/125e3cac192ef650a88f774a5a2dd9afe395a5b8)
- [Deps] update `internal-slot` [`43351b6`](https://github.com/es-shims/iterator-helpers/commit/43351b63545e3698f54daf5dc0652a7b2fb7cb28)

## [v1.0.1](https://github.com/es-shims/iterator-helpers/compare/v1.0.0...v1.0.1) - 2023-02-07

### Commits

- [Fix] `Iterator`: throw when Iterator() is called without new [`a6fc7e7`](https://github.com/es-shims/iterator-helpers/commit/a6fc7e768cbf4d43117365ec2f1bd300247d8dfd)

## v1.0.0 - 2023-02-05

### Commits

- Initial implementation, tests, readme [`650713e`](https://github.com/es-shims/iterator-helpers/commit/650713eecc9d4dab28d5ba3dc5afcbdb8ff99b5a)
- Initial commit [`2379dfd`](https://github.com/es-shims/iterator-helpers/commit/2379dfdad70f64efb31e342a4a7779b1140b2481)
- npm init [`f77411a`](https://github.com/es-shims/iterator-helpers/commit/f77411a443f1a103dbb92a69210228d4fc1e6d04)
- Only apps should have lockfiles [`313dcf5`](https://github.com/es-shims/iterator-helpers/commit/313dcf5211e99569ad275885728b5ac7af30f4ec)
