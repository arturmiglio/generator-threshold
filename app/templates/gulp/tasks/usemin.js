'use strict';

var gulp = require('gulp'),
    config = require('../config.json'),
    usemin = require('gulp-usemin'),
    minifyCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify');

gulp.task('usemin', function() {
    gulp.src(config.dev + 'index.html')
        .pipe(usemin({
            css: [minifyCSS()],
            <% if (useBrowserify) { %>jsVendor: [uglify()],
            jsMain: [uglify()]<% } else { %>js: [uglify()]<% } %>
        }))
        .pipe(gulp.dest(config.dist));
});
