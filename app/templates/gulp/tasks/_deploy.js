'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    config = require('../config.json');

<% if(useFirebase) { %>gulp.task('deploy', shell.task([
  'firebase deploy',
  'firebase open hosting:site'
]));<% } else { %>gulp.task('deploy', function() {

    var conn = ftp.create( {
        host:     config.ftp.staging.host,
        user:     config.ftp.staging.user,
        password: config.ftp.staging.pass,
        parallel: 3,
        log:      gutil.log
    } );

    var globs = [
        config.dist + '/**',
        config.dist + '/**/.htaccess'
    ];

    // turn off buffering in gulp.src for best performance
    return gulp.src( globs, { base: config.dist + '/', buffer: false } )
        .pipe( conn.dest( config.ftp.staging.remotePath ) );
});<% } %>

