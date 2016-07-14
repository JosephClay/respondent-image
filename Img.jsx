const React = require('react');
const respondent = require('./index');
const path = require('path');

const formatSrcset = (image, sizes) => {
	const ext = path.extname(image);
	const basename = path.basename(image, ext);
	const dirname = path.dirname(image);

	return sizes.map(size => path.resolve(dirname, `${basename}-${size}${ext} ${size}w`))
		.join(', ');
};

module.exports = React.createClass({
	componentDidMount() {
		this.resp = respondent.single(this.refs.img);
	},

	componentWillUnmount() {
		this.resp.destroy();
		this.resp = undefined;
	},

	render() {
		const {
			src,
			srcset,
			sizes,
			className = ''
		} =  this.props;
		return (
			<img
				className={ className }
				src={ src }
				data-srcset={ Array.isArray(sizes) ? formatSrcset(src, sizes) : srcset }
				ref="img"
				srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
			/>
		);
	}
});