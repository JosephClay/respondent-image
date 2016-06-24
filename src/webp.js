const TINY_WEBP_IMG = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEADMDOJaQAA3AA/uuuAAA=';
let hasWebPSupport = false;

module.exports = {
	supported: () => hasWebPSupport,

	test(next) {
		const image = new Image();
		image.src = TINY_WEBP_IMG;
		image.onload = image.onerror = function() {
			hasWebPSupport = image.width === 2;
			next();
		};
	}
};
