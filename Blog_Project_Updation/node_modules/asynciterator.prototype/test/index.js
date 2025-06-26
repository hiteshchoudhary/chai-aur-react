'use strict';

var test = require('tape');
var hasSymbols = require('has-symbols')();

var asyncIterProto = require('../');

test('AsyncIterator.prototype', function (t) {
	t.ok(asyncIterProto, 'is truthy');
	t.equal(typeof asyncIterProto, 'object', 'is an object');

	t.test('Symbol.iterator', { skip: !hasSymbols }, function (st) {
		var fn = asyncIterProto[Symbol.iterator];

		st.equal(typeof fn, 'function', 'Symbol.iterator is a function');

		var sentinel = {};
		st.equal(
			fn.call(sentinel),
			sentinel,
			'Symbol.iterator returns receiver'
		);

		st.end();
	});

	t.end();
});
