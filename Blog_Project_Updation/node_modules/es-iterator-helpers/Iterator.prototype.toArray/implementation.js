'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var GetIteratorDirect = require('../aos/GetIteratorDirect');
var IteratorStep = require('es-abstract/2023/IteratorStep');
var IteratorValue = require('es-abstract/2023/IteratorValue');
var Type = require('es-abstract/2023/Type');

var callBound = require('call-bind/callBound');

var $push = callBound('Array.prototype.push');

module.exports = function toArray() {
	if (this instanceof toArray) {
		throw new $TypeError('`toArray` is not a constructor');
	}

	var O = this; // step 1

	if (Type(O) !== 'Object') {
		throw new $TypeError('`this` value must be an Object'); // step 2
	}

	var iterated = GetIteratorDirect(O); // step 3

	var items = []; // step 4

	// eslint-disable-next-line no-constant-condition
	while (true) { // step 5
		var next = IteratorStep(iterated); // step 5.a
		if (!next) {
			return items; // step 5.b
		}
		var value = IteratorValue(next); // step 5.c
		$push(items, value); // step 5.d
	}
};
