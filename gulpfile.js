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
global.config = require(settingsFile);
//global.es = require('event-stream');
global.$ = require('gulp-load-plugins')();

global.outputDir = './meteor/';

var watch = require('gulp-watch'),
    requireDir = require('require-dir'),
    tasks = requireDir('./tasks'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence('clean', 'copy', ['css', 'html', 'js'], function() {});
});

gulp.task('watch', ['default'], function () {
  gulp.watch(settingsFile, function () {
    global.config = fs.readFileSync(settingsFile, 'utf-8');
    gulp.start('css', 'html');
  });

  gulp.watch('sources/**/*.js', ['js']);
  gulp.watch('sources/**/*.html', ['html']);
  gulp.watch('sources/scss/**/*.scss', ['css']);
});

gulp.task('build', function () {
  return runSequence('clean', 'copy', 'html', 'js', 'css', function() {
    return gulp.start('bundle');
  });
});
