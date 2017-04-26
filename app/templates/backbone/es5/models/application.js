'use strict';

var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');

// add to module
navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

module.exports = Backbone.Model.extend({
    url: '',

    constructor: function(attributes) {
        attributes = attributes || {};
    },

    initialize: function() {
        Backbone.Model.prototype.initialize.apply(this, arguments);

        this.delegateEvents();
        this.initEventListeners();
    },

    defaults: {
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        currentPath: null,
        currentStep: null,
        currentStepIndex: 0,
        testMode: false
    },

    events: {
        'change:currentPath': 'updateCurrentStepIndex',
        'change:isMobile': 'updateIsWebcamAvailable'
    },

    delegateEvents: function(){
        for(var eventId in this.events) {
            this.on(eventId, this[this.events[eventId]]);
        }
    },

    initEventListeners: function() {
    },

    validate: function(attrs, options) {
    },

    // updates the current step index according to the current path value
    updateCurrentStepIndex: function(model, currentPath) {
    },
    
    reset: function() {
        this.trigger('reset', this);
    }
});
