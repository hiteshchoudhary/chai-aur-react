'use strict';

var test = require('tape');
var hasSymbols = require('has-symbols')();
var getProto = require('reflect.getprototypeof');

var iterProto = require('../');

test('Iterator.prototype', function (t) {
	t.ok(iterProto, 'is truthy');
	t.equal(typeof iterProto, 'object', 'is an object');

	t.test('Symbol.iterator', { skip: !hasSymbols }, function (st) {
		var fn = iterProto[Symbol.iterator];

		st.equal(typeof fn, 'function', 'Symbol.iterator is a function');

		var sentinel = {};
		st.equal(
			fn.call(sentinel),
			sentinel,
			'Symbol.iterator returns receiver'
		);

		st.end();
	});

	t.test('Array keys', { skip: typeof [].keys !== 'function' }, function (st) {
		st.equal(
			getProto(getProto([].keys())),
			iterProto,
			'ArrayIterator [[Prototype]] is Iterator.prototype'
		);

		st.end();
	});

	t.test('Set keys', { skip: typeof Set !== 'function' || typeof Set.prototype.keys !== 'function' }, function (st) {
		st.equal(
			getProto(getProto(new Set().keys())),
			iterProto,
			'SetIterator [[Prototype]] is Iterator.prototype'
		);

		st.end();
	});

	t.end();
});
