const React = require('react');
const respondent = require('./index');

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
			className = ''
		} = this.props;
		return (
			<div
				className={ className }
				data-srcset={ srcset }
				data-bg={ bg }
				ref="elem"
			>
				{ this.props.children }
			</div>
		);
	}
});