'use strict';

var gulp = require('gulp'),
    config = require('../config.json'),
    browserSync = require('browser-sync');

gulp.task('serve-dev', function() {
    browserSync({
        server: {
            baseDir: config.dev
        }
    });
});