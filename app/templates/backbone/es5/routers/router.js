'use strict';

var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var RootView = require('views/root/root');
var ApplicationModel = require('models/application');
var ConfigData = require('json/config');
var Locales = require('utils/locales');
var Params = require('utils/params');
var Tracker = require('utils/tracker');
var $wrapper = $('#application-wrapper');

$.fn.removePrefixedClass = function(prefix) {
    this.each(function(i, el) {
        var classes = el.className.split(' ').filter(function(c) {
            return c.lastIndexOf(prefix, 0) !== 0;
        });
        el.className = $.trim(classes.join(' '));
    });
    return this;
};

var Controller = Marionette.Object.extend({
  home: function() {
    var root = this.getOption('root');
    root.triggerMethod('show:home');
  },

  routeNotFound: function() {
    var root = this.getOption('root');
    console.log('ROUTE NOT FOUND: redirected to HOME');
    root.triggerMethod('show:home');
  }
})

module.exports = Marionette.AppRouter.extend({
    // if true, routes will be validated
    // add ?no_redirect to the url in order to prevent route validation
    validate: true,
    tracker: null,
    localizedTracker: null,

    controller: new Controller(),

    appRoutes: {
        '' : 'home',
        'home' : 'home',
        '*splat' : 'routeNotFound'
    },

    initialize: function(options) {
        window.__router = this;

        window._ = _;

        this.model = options.model;

        Locales.init();

        this.params = Params.getQueryParams(location.search);

        if(this.params.testMode) {
            this.model.set('testMode', true);
        }

        this.initTracker();
    },

    initTracker: function() {
        this.tracker = new Tracker(ConfigData.globalTrackingCode);
    },

    onRoute : function(name, path, args) {
        console.log('ROUTE:', name);
        this.model.set('currentPath', path);
        var root = this.getOption('root');

        // var stepsNav = this.$el;
        var classPrefix = 'active-';
        var classToAdd = '';
        var classSufix = this.model.get('currentPath');

        classToAdd = classPrefix + classSufix;

        root.$el.removePrefixedClass(classPrefix);
        root.$el.addClass(classToAdd);

        this.tracker.trackPage(location.hash.replace('#', '/'));
    },

    validatePath: function(path) {
        if(!this.model) {
            return '';
        }

        switch(path) {
            default:
            break;
        }

        return path;
    },

    navigate: function(fragment, options) {
        options = options || {trigger: true};

        return Backbone.Router.prototype.navigate.apply(this, [fragment, options]);
    },

    navigateExt: function(url) {
        window.location = url;
    }
});
