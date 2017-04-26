'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    argv = require('yargs').argv;

var sequence = [
    [
        'clean'
    ],<% if (useSprites) { %>
    [
        'sprites'
    ],<% } %><% if (useIconFont) { %>
    [
        'icons'
    ],<% } %>
    [
        'sass', 
        <% if (useBrowserify) { %>'browserify:vendor', 
        'browserify:app'<% } else { %>'lint'<% } %>
    ],
    'usemin',
    'copy'
];

gulp.task('build', function(cb) {
    <% if (useDeploy) { %>if(argv.deploy) {
        sequence.push('deploy');
    }<% } %>
    sequence.push(cb);

    runSequence.apply(this, sequence);
});
