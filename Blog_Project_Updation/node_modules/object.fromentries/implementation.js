'use strict';

var AddEntriesFromIterable = require('es-abstract/2023/AddEntriesFromIterable');
var CreateDataPropertyOrThrow = require('es-abstract/2023/CreateDataPropertyOrThrow');
var RequireObjectCoercible = require('es-abstract/2023/RequireObjectCoercible');
var ToPropertyKey = require('es-abstract/2023/ToPropertyKey');

var adder = function addDataProperty(key, value) {
	var O = this; // eslint-disable-line no-invalid-this
	var propertyKey = ToPropertyKey(key);
	CreateDataPropertyOrThrow(O, propertyKey, value);
};

module.exports = function fromEntries(iterable) {
	RequireObjectCoercible(iterable);

	return AddEntriesFromIterable({}, iterable, adder);
};
