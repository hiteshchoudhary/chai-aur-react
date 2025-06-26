'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Iterator === 'function' && typeof Iterator.prototype.drop === 'function'
		? Iterator.prototype.drop
		: implementation;
};
