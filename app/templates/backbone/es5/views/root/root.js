'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var BaseView = require('components/base-view');

window.$ = $; // export jquery for test purpose

module.exports = BaseView.extend({
    template: require('../../templates/root/root.html'),

    className: 'root-view',

    regions: {
        
    },

    ui: {
        
    },

    events: {
        
    },

    currentSection: null,
    targetSection: null,

    onRender: function() {
        if(this.currentSection) {
            this.showChildView('section', this.currentSection);
        }
    },

    onShowHome: function() {
        // this.showChildView('background', this.background);
        // this.background.show();
        this.getRegion('background').detachView();
        this.showSection(new HomeSection({ model: this.model, root: this })); // TODO cache section
    },

    showSection: function(section) {
        this.targetSection = section;
        if(this.currentSection) {
            this.hideCurrentSection();
        } else {
            this.showTargetSection();
        }
    },

    hideCurrentSection: function() {
        if (this.currentSection) {
            this.listenToOnce(this.currentSection, 'hide-complete', this.showTargetSection);
            this.currentSection.hide();
        }
    },

    showTargetSection: function() {
        if (this.targetSection) {
            this.currentSection = this.targetSection;
            this.targetSection = null;
            this.showChildView('section', this.currentSection);
            this.currentSection.show();
        }
    },

    onWindowResize: function() {
        // TODO make more robust
        var width = $(window).width();
        var breakpointTabletWidth = 768;
        var breakpointDesktopWidth = 1024;

        this.model.set({
            isMobile: width < breakpointTabletWidth,
            isTablet: width >= breakpointTabletWidth && width <= breakpointDesktopWidth,
            isDesktop: width > breakpointDesktopWidth
        });
    },

    trackClick: function(e) {
        var $target = $(e.currentTarget);
        __router.tracker.trackEvent($target.data('category'), $target.data('action'), $target.data('label'));
    }
    
});
