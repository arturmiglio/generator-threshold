'use strict';

var translations = require('json/locales');
var _ = require('underscore');

var localeOptions = {};
localeOptions.defaultLocale = "es";
localeOptions.translations = translations;
localeOptions.locale = "es";

window.I18n = localeOptions;

var i18n = require('i18n-js');

function getLocaleFromObject(object, key, scope) {
	var text = object[key];

	if (!text) {
		return 'missing key ' + scope + '.' + key;
	}

	if (typeof text === 'string') {
		return text;
	} else {
		return;
	}
}

function translate() {
	// create alias
	return i18n.t.apply(i18n, arguments);
}

module.exports = {
	init: function() {
		// TODO
		window.t = translate;
	},
	t: translate
};
