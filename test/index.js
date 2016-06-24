const test = require('tape');
const { parse } = require('../src/options');
const srcset = [
	'/path/to/content/jibberish-600.jpg 600w',
	'/path/to/content/jibberish-500.jpg 500w',
	'/path/to/content/jibberish-300.jpg 300w',
	'/path/to/content/jibberish-100.jpg 100w'
].join(', ');

test('srcset', assert => {
	assert.ok(Array.isArray(parse(srcset)), 'parse creates an array');
	assert.equal(parse(srcset).length, 4, 'parse creates the correct number of nodes');
	assert.equal(parse(srcset)[0].width, 100, 'the first node is the smallest');
	assert.equal(parse(srcset)[3].width, 600, 'the last node is the largest');

	assert.end();
});