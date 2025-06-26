'use strict';

var GetIntrinsic = require('get-intrinsic');
var hasPropertyDescriptors = require('has-property-descriptors')();

var $TypeError = GetIntrinsic('%TypeError%');
var $defineProperty = hasPropertyDescriptors && GetIntrinsic('%Object.defineProperty%', true);

var iterProto = require('iterator.prototype');
var callBound = require('call-bind/callBound');

var $isPrototypeOf = callBound('Object.prototype.isPrototypeOf');

var $Iterator = typeof Iterator === 'function' ? Iterator : function Iterator() {
	if (
		!(this instanceof Iterator)
		|| this.constructor === Iterator
		|| !$isPrototypeOf(Iterator, this.constructor)
	) {
		throw new $TypeError('`Iterator` can not be called or constructed directly');
	}
};

if ($Iterator.prototype !== iterProto) {
	$Iterator.prototype = iterProto;
}
$defineProperty($Iterator, 'prototype', { writable: false });

module.exports = $Iterator;
