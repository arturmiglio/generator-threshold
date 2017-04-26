'use strict';

var gulp = require('gulp'),
    config = require('../config.json'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    gulpif = require('gulp-if'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    handleErrors = require('../utils/handle-errors'),
    filter = require('gulp-filter');

gulp.task('sass', function() {

    var plugins = [
        autoprefixer({browsers: ['last 2 versions','ie >= 9','iOS 8']})
    ];

    return gulp.src(config.sass + '/**/*.scss')
        .pipe(gulpif(global.isWatching, sourcemaps.init()))
        .pipe(sass({
            includePaths: [
                'node_modules/'
            ]
        }))
        .pipe(postcss(plugins))
        .pipe(gulpif(global.isWatching, sourcemaps.write('./')))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.css))
        .pipe(filter(['**/*.css']))
        .pipe(browserSync.stream());
});