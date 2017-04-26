'use strict';

var gulp = require('gulp'),
    config = require('../config.json'),
    _ = require('lodash'),
    gulpif = require('gulp-if'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    handleErrors = require('../utils/handle-errors'),
    bundleLogger = require('../utils/bundle-logger'),
    bra = require('browserify-require-async'),
    wrap = require('gulp-wrap'),
    argv = require('yargs').argv;

var packageJson = require('../../package.json');
var dependencies = Object.keys(packageJson && packageJson.dependencies || {});

/* ###########################
   ###### VENDOR BUNDLE ######
   ########################### */
   
var browserifyVendorConfig = [
        {
            dest: config.js,
            outputName: 'vendor.js'
        }
    ];

var browserifyTaskVendor = function(config, callback) {
    var bundleQueue = config.length,
        browserifyThis = function(bundleConfig) {
            if (global.isWatching) {
                _.extend(bundleConfig, watchify.args, {debug: true});
            }

            var b = browserify(bundleConfig),
                bundle = function() {
                    bundleLogger.start(bundleConfig.outputName);

                    return b.require(dependencies)
                        .bundle()
                        .on('error', handleErrors)
                        .pipe(source(bundleConfig.outputName))
                        .pipe(buffer())
                        .pipe(gulpif(!global.isWatching, uglify()))
                        .pipe(gulp.dest(bundleConfig.dest))
                        .on('end', reportFinished)
                        .pipe(gulpif(global.isWatching, browserSync.reload({stream: true})));
                };


            b.transform(bra, {});


            if (global.isWatching) {
                b = watchify(b);
                b.on('update', bundle);
                bundleLogger.watch(bundleConfig.outputName);
            }

            var reportFinished = function() {
                bundleLogger.end(bundleConfig.outputName);

                if (bundleQueue) {
                    bundleQueue--;

                    if (bundleQueue === 0) {
                        callback();
                    }
                }
            };

            return bundle();
        };

    config.forEach(browserifyThis);
};

gulp.task('browserify:vendor', function(cb) {
    browserifyTaskVendor(browserifyVendorConfig, cb);
});

/* ######################## 
   ###### APP BUNDLE ######
   ######################## */

var browserifyAppConfig = [
        {
            entries: config.dev + config.js + '/app.js',
            dest: config.js,
            outputName: 'bundle.js',
            paths: [ './node_modules/', './js/' ]
        }
    ];

var browserifyTaskApp = function(config, callback) {
    var bundleQueue = config.length,
        browserifyThis = function(bundleConfig) {
            if (global.isWatching) {
                _.extend(bundleConfig, watchify.args, {debug: true});
            }

            var b = browserify(bundleConfig),
                bundle = function() {
                    bundleLogger.start(bundleConfig.outputName);

                    return b.external(dependencies)
                        .bundle()
                        .on('error', handleErrors)
                        .pipe(source(bundleConfig.outputName))
                        .pipe(buffer())
                        .pipe(gulpif(!global.isWatching, uglify()))
                        .pipe(gulp.dest(bundleConfig.dest))
                        .on('end', reportFinished)
                        .pipe(gulpif(global.isWatching, browserSync.reload({stream: true})));
                };


            b.transform(bra, {});


            if (global.isWatching) {
                b = watchify(b);
                b.on('update', bundle);
                bundleLogger.watch(bundleConfig.outputName);
            }

            var reportFinished = function() {
                bundleLogger.end(bundleConfig.outputName);

                if (bundleQueue) {
                    bundleQueue--;

                    if (bundleQueue === 0) {
                        callback();
                    }
                }
            };

            return bundle();
        };

    config.forEach(browserifyThis);
};

gulp.task('browserify:app', function(cb) {
    browserifyTaskApp(browserifyAppConfig, cb);
});