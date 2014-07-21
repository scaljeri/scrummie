var gulp = require('gulp'),
    es = require('event-stream'),
    $ = require('gulp-load-plugins')();

var watch = require('gulp-watch'),
   plumber = require('gulp-plumber'),
   sass = require('gulp-sass');

gulp.task('styles', function () {
    var _sass = gulp.src('../scss/scrummie.scss')
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe($.autoprefixer('last 2 versions'));

    var _css = gulp.src([
        '/animate.css/animate.css',
        '/jquery-ui/themes/base/jquery-ui.css',
        '/select2/select2.css',
        '/nvd3/nv.d3.min.css'], {root: '../public/bower_components'});

    es.merge(_css, _sass)
        .pipe($.concat('scrummie.css'))
        .pipe($.filelog())
        .pipe($.size())
        .pipe(gulp.dest('../public/styles/'));
});

gulp.task('default', function () {
   gulp.watch([
   '../scss/**/*.scss'
   ], ['styles']);
});