module.exports = base => {
	const arr = [];
	let idx = base.length;
	while (idx--) {
		let node = base[idx];
		if (node.length) {
			let i = node.length;
			while (i--) {
				arr.push(node[i]);
			}
		} else {
			arr.push(node);
		}
	}
	return arr;
};