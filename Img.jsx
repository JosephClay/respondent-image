const React = require('react');
const respondent = require('./index');

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
			className = ''
		} =  this.props;
		return (
			<img
				className={ className }
				src={ src }
				data-srcset={ srcset }
				ref="img"
				srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
			/>
		);
	}
});