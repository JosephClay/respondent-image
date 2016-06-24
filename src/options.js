const sort = require('./sort');
const webp = require('./webp');

const parseOption = function(opt) {
	const option = opt.trim().split(' ');
	const image = option[0];
	const width = !option[1] ? 999998 : parseInt(option[1], 10);
	const isWebp = ~image.indexOf('.webp', image.length - 5);
	const valid = !isWebp ? true :
		isWebp && webp.supported() ? true :
		false;

	if (!valid) { return; }

	return {
		image,
		width,
		webp: isWebp
	};
};

const notUndefined = obj => obj !== undefined;

module.exports = {
	defaults: { image: '', width: 0 },

	parse(options) {
		if (!options) { return []; }

		return options
			.split(',')
			.map(parseOption)
			.filter(notUndefined)
			.sort(sort);
	},

	select(options, size) {
		for (let idx = 0; idx < options.length; idx++) {
			if (options[idx].width >= size) {
				return options[idx];
			}
		}
	}
};
