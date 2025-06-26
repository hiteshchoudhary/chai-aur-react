'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('es-abstract/2023/Call');
var GetIteratorDirect = require('../aos/GetIteratorDirect');
var IsCallable = require('es-abstract/2023/IsCallable');
var IteratorClose = require('../aos/IteratorClose');
var IteratorStep = require('es-abstract/2023/IteratorStep');
var IteratorValue = require('es-abstract/2023/IteratorValue');
var ThrowCompletion = require('es-abstract/2023/ThrowCompletion');
var Type = require('es-abstract/2023/Type');

module.exports = function reduce(reducer) {
	if (this instanceof reduce) {
		throw new $TypeError('`reduce` is not a constructor');
	}

	var O = this; // step 1
	if (Type(O) !== 'Object') {
		throw new $TypeError('`this` value must be an Object'); // step 2
	}

	if (!IsCallable(reducer)) {
		throw new $TypeError('`reducer` must be a function'); // step 3
	}

	var iterated = GetIteratorDirect(O); // step 4

	var accumulator;
	var counter;
	var next;
	if (arguments.length < 2) { // step 6
		next = IteratorStep(iterated); // step 6.a
		if (!next) {
			throw new $TypeError('Reduce of empty iterator with no initial value'); // step 6.b
		}
		accumulator = IteratorValue(next); // step 6.c
		counter = 1;
	} else { // step 7
		accumulator = arguments[1]; // step 7.a
		counter = 0;
	}

	// eslint-disable-next-line no-constant-condition
	while (true) { // step 8
		next = IteratorStep(iterated); // step 8.a
		if (!next) {
			return accumulator; // step 8.b
		}
		var value = IteratorValue(next); // step 8.c
		try {
			var result = Call(reducer, void undefined, [accumulator, value, counter]); // step 8.d
			accumulator = result; // step 8.f
		} catch (e) {
			// close iterator // step 8.e
			IteratorClose(
				iterated,
				ThrowCompletion(e)
			);
		}
		counter += 1; // step 8.g
	}
};
