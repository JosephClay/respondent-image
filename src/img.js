const { parse, select, defaults } = require('./options');
const noop = require('./util/noop');
const defer = require('./util/defer');
const { devicePixelRatio = 1 } = global;
const A_LARGE_NUMBER = 1e9;

module.exports = function(element, remove) {
	let lastOption = Object.assign({}, defaults);
	let currentSize = 0;
	const defaultOption = { image: element.getAttribute('src'), width: A_LARGE_NUMBER };
	const options = parse(element.getAttribute('data-srcset'));

	const update = function(callback) {
		const option = select(options, currentSize) || defaultOption;

		if (lastOption.width < option.width) {
			lastOption = option;
			element.addEventListener('load', function() {
				element.removeEventListener('load');
				callback();
			});
			element.setAttribute('srcset', option.image);
		}

		return defer(callback);
	};

	return {
		image: element,

		maximize(callback = noop) {
			currentSize = A_LARGE_NUMBER;
			update(callback);
		},

		update(callback = noop) {
			const newSize = element.offsetWidth * devicePixelRatio;
			if (newSize === currentSize) { return defer(callback); }
			currentSize = newSize;
			update(callback);
		},

		destroy() {
			remove(this);
		}
	};
};