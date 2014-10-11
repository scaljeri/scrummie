require('shelljs/global');

var fs, settings;

global.gulp = require('gulp');
global.gutil = require('gulp-util');
global.assetpath = require('gulp-assetpaths');
global.fs = require('fs');
global.shell = require('gulp-shell');
global.argv = require('yargs').argv;
global.Q = require('q');
global.settingsFile = process.cwd() + '/' + (global.argv.settings || 'scrummie.json');
//global.es = require('event-stream');
global.$ = require('gulp-load-plugins')();

global.outputDir = './meteor/';
global.inputDir = './';

var watch = require('gulp-watch'),
    requireDir = require('require-dir'),
    tasks = requireDir('./tasks'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence('clean-meteor', 'copy-to-meteor', ['css-to-meteor', 'html-to-meteor', 'js-to-meteor'], function() {});
});

gulp.task('watch', ['default'], function () {
  gulp.watch(settingsFile, function () {
    global.config = fs.readFileSync(settingsFile, 'utf-8');
    gulp.start('css-to-meteor', 'html-to-meteor');
  });

  gulp.watch('sources/**/*.js', ['js-to-meteor']);
  gulp.watch('sources/**/*.html', ['html-to-meteor']);
  gulp.watch('sources/scss/**/*.scss', ['css-to-meteor']);
});

gulp.task('build', function () {
  return runSequence('clean-to-meteor', 'copy-to-meteor', 'html-to-meteor', 'js-to-meteor', 'css-to-meteor', function() {
    return gulp.start('bundle-scrummie');
  });
});
