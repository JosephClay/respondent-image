module.exports = fn => {
	let called;
	return () => {
		if (called) { return; }
		fn.apply(null, arguments);
		called = true;
	};
};
