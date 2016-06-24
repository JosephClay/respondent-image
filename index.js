const img = require('./src/img');
const bg = require('./src/bg');
const webp = require('./src/webp');
const once = require('./src/util/once');
const isString = require('./util/isString');
const flatten = require('./util/flatten');
const qsa = document.querySelectorAll;

let hasChanged = true;
let instances = [];

const update = function() {
	let idx = instances.length;
	while (idx--) {
		instances[idx].update();
	}
};

const remove = function(inst) {
	let idx = instances.length;
	while (idx--) {
		if (instances[idx] === inst) {
			instances.splice(idx, 1);
			return;
		}
	}
};

const run = function() {
	if (hasChanged) {
		hasChanged = false;
		update();
	}
	requestAnimationFrame(run);
};

const setChanged = () => {
	hasChanged = true;
};

const start = once(function() {
	webp.test(function() {
		global.addEventListener('resize', setChanged);
		global.addEventListener('scroll', setChanged);

		run();
	});
});

const groupInitializerFactory = fn => {
	return function(images) {
		setChanged();
		start();

		// passed an array of something:
		const elementArray = Array.isArray(images) ?
			flatten(images.map(img => isString(img) ? qsa(img) : img)) :
			// passed a string to query
			isString(images) ? qsa(images) :
			// just passed an element
			[images];

		// generate a new image for each element in the elementArray
		const results = elementArray.map(img => fn(img, remove));
		// add the results to instances
		instances = instances.concat(results);
		// give back the results
		return results;
	};
};

const singleInitializerFactory = fn => {
	return function(image) {
		setChanged();
		start();

		const result = fn(image, remove);
		// add the result to instances
		instances.push(result);
		// give back the results
		return result;
	};
};

module.exports = Object.assign(groupInitializerFactory(img), {
	bg: groupInitializerFactory(bg),

	single: singleInitializerFactory(img),
	singleBg: singleInitializerFactory(bg)
});