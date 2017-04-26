'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Router = require('routers/router');
var ConfigData = require('json/config');
var RootView = require('view/root/root');
var ApplicationModel = require('models/application');

var App = new Marionette.Application({
    region: '#application-wrapper',

    onStart: function(options) {
        var model = new ApplicationModel(ConfigData);
        var router = new Router({ model: model });
        var root = new RootView({ model: model });

        router.root = root;
        router.controller.options.app = this;
        router.controller.options.model = model;

        this.showView(root);
        router.controller.options.root = root;

        /** Starts the URL handling framework */
        Backbone.history.start();

    }
});

App.start(ConfigData);