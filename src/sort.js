module.exports = function(a, b) {
	const aWidth = a.width;
	const bWidth = b.width;

	if (aWidth < bWidth) { return -1; }
	if (aWidth > bWidth) { return 1; }

	const aWebp = a.webp;
	const bWebp = b.webp;

	if (aWidth === bWidth) {
		if (bWebp) { return 1; }
		if (aWebp) { return -1; }
	}

	return 0;
};