'use strict';

var gulp = require('gulp'),
    config = require('../config.json'),
    browserSync = require('browser-sync');

gulp.task('serve-build', function() {
    browserSync({
        server: {
            baseDir: config.dist
        }
    });
});