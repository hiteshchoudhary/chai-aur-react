/*
  @license
	Rollup.js v3.29.2
	Fri, 15 Sep 2023 18:58:54 GMT - commit be3b25c68382b227548cdbcab057d29805e34e02

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const rollup = require('./shared/rollup.js');
const watchProxy = require('./shared/watch-proxy.js');
require('node:process');
require('tty');
require('node:path');
require('path');
require('node:perf_hooks');
require('node:crypto');
require('node:fs/promises');
require('./shared/fsevents-importer.js');



exports.VERSION = rollup.version;
exports.defineConfig = rollup.defineConfig;
exports.rollup = rollup.rollup;
exports.watch = watchProxy.watch;
//# sourceMappingURL=rollup.js.map
