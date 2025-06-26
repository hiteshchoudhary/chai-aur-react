'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('es-abstract/2023/Call');
var CompletionRecord = require('es-abstract/2023/CompletionRecord');
var CreateIteratorFromClosure = require('../aos/CreateIteratorFromClosure');
var GetIteratorDirect = require('../aos/GetIteratorDirect');
var GetIteratorFlattenable = require('../aos/GetIteratorFlattenable');
var IsCallable = require('es-abstract/2023/IsCallable');
var IteratorClose = require('../aos/IteratorClose');
var IteratorStep = require('es-abstract/2023/IteratorStep');
var IteratorValue = require('es-abstract/2023/IteratorValue');
var ThrowCompletion = require('es-abstract/2023/ThrowCompletion');
var Type = require('es-abstract/2023/Type');

var iterHelperProto = require('../IteratorHelperPrototype');

var SLOT = require('internal-slot');

module.exports = function flatMap(mapper) {
	if (this instanceof flatMap) {
		throw new $TypeError('`flatMap` is not a constructor');
	}

	var O = this; // step 1
	if (Type(O) !== 'Object') {
		throw new $TypeError('`this` value must be an Object'); // step 2
	}

	if (!IsCallable(mapper)) {
		throw new $TypeError('`mapper` must be a function'); // step 3
	}

	var iterated = GetIteratorDirect(O); // step 4

	var sentinel = { sentinel: true };
	var innerIterator = sentinel;

	var closeIfAbrupt = function (abruptCompletion) {
		if (!(abruptCompletion instanceof CompletionRecord)) {
			throw new $TypeError('`abruptCompletion` must be a Completion Record');
		}
		try {
			if (innerIterator !== sentinel) {
				IteratorClose(
					innerIterator,
					abruptCompletion
				);
			}
		} finally {
			innerIterator = sentinel;

			IteratorClose(
				iterated,
				abruptCompletion
			);
		}
	};

	var counter = 0; // step 5.a
	var innerAlive = false;
	var closure = function () {
		// while (true) { // step 5.b
		if (innerIterator === sentinel) {
			var next = IteratorStep(iterated); // step 5.b.i
			if (!next) {
				innerAlive = false;
				innerIterator = sentinel;
				// return void undefined; // step 5.b.ii
				return sentinel;
			}
			var value = IteratorValue(next); // step 5.b.iii
		}

		if (innerIterator === sentinel) {
			innerAlive = true; // step 5.b.viii
			try {
				var mapped = Call(mapper, void undefined, [value, counter]); // step 5.b.iv
				// yield mapped // step 5.b.vi
				innerIterator = GetIteratorFlattenable(mapped, 'reject-strings'); // step 5.b.vi
			} catch (e) {
				innerAlive = false;
				innerIterator = sentinel;
				closeIfAbrupt(ThrowCompletion(e)); // steps 5.b.v, 5.b.vii
			} finally {
				counter += 1; // step 5.b.x
			}
		}
		// while (innerAlive) { // step 5.b.ix
		if (innerAlive) {
			var innerNext;
			try {
				innerNext = IteratorStep(innerIterator); // step 5.b.ix.1
			} catch (e) {
				innerIterator = sentinel;
				closeIfAbrupt(ThrowCompletion(e)); // step 5.b.ix.2
			}
			if (!innerNext) {
				innerAlive = false; // step 5.b.ix.3.a
				innerIterator = sentinel;
				return closure();
			}
			// step 5.b.ix.4
			var innerValue;
			try {
				innerValue = IteratorValue(innerNext); // step 5.b.ix.4.a
			} catch (e) {
				innerAlive = false;
				innerIterator = sentinel;
				closeIfAbrupt(ThrowCompletion(e)); // step 5.b.ix.4.b
			}
			return innerValue; // step 5.b.ix.4.c
		}
		// }
		// return void undefined;
		return sentinel;
	};
	SLOT.set(closure, '[[Sentinel]]', sentinel); // for the userland implementation
	SLOT.set(closure, '[[CloseIfAbrupt]]', closeIfAbrupt); // for the userland implementation

	var result = CreateIteratorFromClosure(closure, 'Iterator Helper', iterHelperProto, ['[[UnderlyingIterator]]']); // step 7

	SLOT.set(result, '[[UnderlyingIterator]]', iterated); // step 8

	return result; // step 9
};
