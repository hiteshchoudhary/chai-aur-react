'use strict';

var hasSymbols = require('has-symbols');

/* globals AsyncIterator: false */

var asyncIterProto = typeof AsyncIterator === 'function' ? AsyncIterator.prototype : {};

if (hasSymbols() && !(Symbol.iterator in asyncIterProto)) {
	asyncIterProto[Symbol.iterator] = function () {
		return this;
	};
}

module.exports = asyncIterProto;
