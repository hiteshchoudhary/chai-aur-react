'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Iterator === 'function' && typeof Iterator.prototype.filter === 'function'
		? Iterator.prototype.filter
		: implementation;
};
