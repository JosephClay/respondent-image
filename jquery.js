const $ = require('jquery');
const pluginName = 'respondent';
const respondent = require('./index');

$.fn.respondent = function() {
	return this.each(function() {
		if (!$.data(this, `plugin_${pluginName}`)) {
			$.data(this, `plugin_${pluginName}`, respondent.single(this));
		}
	});
};

$.fn.respondentBg = function() {
	return this.each(function() {
		if (!$.data(this, `plugin_${pluginName}`)) {
			$.data(this, `plugin_${pluginName}`, respondent.singleBg(this));
		}
	});
};