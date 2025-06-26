'use strict';

var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var ArrayCreate = require('es-abstract/2023/ArrayCreate');
var CreateDataPropertyOrThrow = require('es-abstract/2023/CreateDataPropertyOrThrow');
var IsCallable = require('es-abstract/2023/IsCallable');
var LengthOfArrayLike = require('es-abstract/2023/LengthOfArrayLike');
var ToObject = require('es-abstract/2023/ToObject');
var ToString = require('es-abstract/2023/ToString');

var $TypeError = GetIntrinsic('%TypeError%');

var $sort = callBound('Array.prototype.sort');

module.exports = function toSorted(comparefn) {
	if (typeof comparefn !== 'undefined' && !IsCallable(comparefn)) {
		throw new $TypeError('`comparefn` must be a function');
	}

	var O = ToObject(this); // step 2
	var len = LengthOfArrayLike(O); // step 3
	var A = ArrayCreate(len); // step 4
	var j = 0;
	while (j < len) { // steps 5-7, 9-10
		CreateDataPropertyOrThrow(A, ToString(j), O[j]);
		j += 1;
	}

	$sort(A, comparefn); // step 8

	return A; // step 11
};
