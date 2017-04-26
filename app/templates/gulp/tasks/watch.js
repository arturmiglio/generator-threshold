'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    config = require('../config.json'),
    argv = require('yargs').argv;

if (argv.lint) {

    gulp.task('watch', ['lint'<% if (useBrowserify) { %>, 'browserify:vendor', 'browserify:app'<% } %>], function() {
        gulp.watch(config.dev + 'index.html', browserSync.reload);
        <% if (useBackbone) { %>gulp.watch(config.dev + 'templates/**/*.html', ['browserify:app']);<% } %>
        <% if (useSprites) { %>gulp.watch(config.sprites + '/*-2x/*.png', ['resize-sprites']);<% } %>
        <% if (useIconFont) { %>gulp.watch(config.fonts + '/icomoon/**/*.*', ['icons']);<% } %>
        gulp.watch(config.sass + '/**/*.scss', ['sass']);
        gulp.watch([
            config.js + '/**/*.{js,jsx}',
            '!' + config.js + '/libs/**/*.{js,jsx}',<% if (useBrowserify) { %>
            '!' + config.js + '/bundle.js',<% } %>
            '!' + config.js + '/**/*.min.js'
        ], ['lint']);
    });

} else {

    gulp.task('watch', ['browserify:vendor', 'browserify:app'], function() {
        gulp.watch(config.dev + 'index.html', browserSync.reload);
        gulp.watch(config.dev + 'templates/**/*.html', ['browserify:app']);
        gulp.watch(config.sprites + '/*-2x/*.png', ['resize-sprites']);
        gulp.watch(config.fonts + '/icomoon/**/*.*', ['icons']);
        gulp.watch(config.sass + '/**/*.scss', ['sass']);
        gulp.watch([
            config.js + '/**/*.{js,jsx}',
            '!' + config.js + '/libs/**/*.{js,jsx}',
            '!' + config.js + '/bundle.js',
            '!' + config.js + '/**/*.min.js'
        ]);
    });

    gulp.task('watch',<% if (useBrowserify) { %> ['browserify:vendor', 'browserify:app'],<% } %> function() {
        gulp.watch(config.dev + 'index.html', browserSync.reload);
        <% if (useBackbone) { %>gulp.watch(config.dev + 'templates/**/*.html', ['browserify:app']);<% } %>
        <% if (useSprites) { %>gulp.watch(config.sprites + '/*-2x/*.png', ['resize-sprites']);<% } %>
        <% if (useIconFont) { %>gulp.watch(config.fonts + '/icomoon/**/*.*', ['icons']);<% } %>
        gulp.watch(config.sass + '/**/*.scss', ['sass']);
        gulp.watch([
            config.js + '/**/*.{js,jsx}',
            '!' + config.js + '/libs/**/*.{js,jsx}',<% if (useBrowserify) { %>
            '!' + config.js + '/bundle.js',<% } %>
            '!' + config.js + '/**/*.min.js'
        ], ['lint']);
    });

}