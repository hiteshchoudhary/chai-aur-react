'use strict';

var setToStringTag = require('es-set-tostringtag');
var hasProto = require('has-proto')();
var iterProto = require('../Iterator.prototype/implementation');
var SLOT = require('internal-slot');

var CompletionRecord = require('es-abstract/2023/CompletionRecord');
var CreateIterResultObject = require('es-abstract/2023/CreateIterResultObject');
var GeneratorResume = require('../aos/GeneratorResume');
var GeneratorResumeAbrupt = require('../aos/GeneratorResumeAbrupt');
var IteratorClose = require('../aos/IteratorClose');
var NormalCompletion = require('es-abstract/2023/NormalCompletion');

var implementation;
if (hasProto) {
	implementation = {
		__proto__: iterProto,
		next: function next() {
			return GeneratorResume(this, void undefined, 'Iterator Helper');
		},
		'return': function () {
			var O = this; // step 1

			SLOT.assert(O, '[[UnderlyingIterator]]'); // step 2

			SLOT.assert(O, '[[GeneratorState]]'); // step 3

			if (SLOT.get(O, '[[GeneratorState]]') === 'suspendedStart') { // step 4
				SLOT.set(O, '[[GeneratorState]]', 'completed'); // step 4.a
				IteratorClose(SLOT.get(O, '[[UnderlyingIterator]]'), NormalCompletion('unused')); // step 4.c
				return CreateIterResultObject(void undefined, true); // step 4.d
			}

			var C = new CompletionRecord('return', void undefined); // step 5

			return GeneratorResumeAbrupt(O, C, 'Iterator Helper'); // step 6
		}
	};
	setToStringTag(implementation, 'Iterator Helper');
} else {
	var IteratorHelper = function IteratorHelper() {};
	IteratorHelper.prototype = iterProto;
	implementation = new IteratorHelper();
	delete implementation.constructor;
	implementation.next = function next() {
		return GeneratorResume(this, void undefined, 'Iterator Helper');
	};
	implementation['return'] = function () {
		var C = new CompletionRecord('return', void undefined); // step 1
		return GeneratorResumeAbrupt(this, C, 'Iterator Helper');
	};
}

module.exports = implementation;
