const React = require('react');
const path = require('path');
const respondent = require('./index');

const formatSrcset = (image, sizes) => {
	const ext = path.extname(image);
	const basename = path.basename(image, ext);
	const dirname = path.dirname(image);

	return sizes.map(size => path.resolve(dirname, `${basename}-${size}${ext} ${size}w`))
		.join(', ');
};

module.exports = React.createClass({
	componentDidMount() {
		this.resp = respondent.singleBg(this.refs.elem);
	},

	componentWillUnmount() {
		this.resp.destroy();
		this.resp = undefined;
	},

	render() {
		const {
			bg,
			srcset,
			sizes,
			className = ''
		} = this.props;

		return (
			<div
				className={ className }
				data-srcset={ Array.isArray(sizes) ? formatSrcset(bg, sizes) : srcset }
				data-bg={ bg }
				ref="elem"
			>
				{ this.props.children }
			</div>
		);
	}
});