'use strict';

var GetIntrinsic = require('get-intrinsic');
var gPO = require('reflect.getprototypeof');
var hasSymbols = require('has-symbols');
var define = require('define-properties');
var setFunctionName = require('set-function-name');

var arrayIterProto = GetIntrinsic('%ArrayIteratorPrototype%', true);

var iterProto = arrayIterProto && gPO(arrayIterProto);

var result = iterProto || {};

if (hasSymbols()) {
	var defined = {};
	var predicates = {};
	var trueThunk = function () {
		return true;
	};

	if (!(Symbol.iterator in result)) {
		// needed when result === iterProto, or, node 0.11.15 - 3
		defined[Symbol.iterator] = setFunctionName(function SymbolIterator() {
			return this;
		}, '[Symbol.iterator]', true);

		predicates[Symbol.iterator] = trueThunk;
	}

	define(result, defined, predicates);
}

module.exports = result;
