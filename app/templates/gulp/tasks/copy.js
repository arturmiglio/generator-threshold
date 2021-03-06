'use strict';

var gulp = require('gulp'),
    config = require('../config.json');

gulp.task('copy', function() {
    return gulp.src([
            config.img + '/**',
            config.fonts + '/**',
            '.htaccess'<% if (useSprites) { %>,
            '!' + config.img + '/' + config.sprites<% } %>
        ], {base: '.'})
        .pipe(gulp.dest(config.dist));
});
