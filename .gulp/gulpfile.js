var gulp = require('gulp'),
//es      = require('event-stream'),
  $ = require('gulp-load-plugins')();

var watch = require('gulp-watch'),
   plumber = require('gulp-plumber'),
   sass = require('gulp-sass');

gulp.task('styles', function () {
  //var styles = gulp.src('../scss')
  gulp.src('../scss/scrummie.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer('last 2 versions'))
    //.pipe($.rename('app.css'))
    .pipe(gulp.dest('../public/styles/'))
    .pipe($.filelog())
    .pipe($.size());
});

gulp.task('default', function () {
   gulp.watch([
   '../scss/**/*.scss'
   ], ['styles']);

  //gulp.src('../scss/**/*.scss')
    //.pipe($.watch(function (files) {
        //return files.pipe($.sass())
          //.pipe(gulp.dest('../public/styles/'));
      //}
    //));
  /*
   if (production) {
   styles = es.merge(compileCss(), styles)
   .pipe($.concat('app.css'))
   .pipe($.cssmin());
   }

   return styles
   .pipe($.rename('app.css'))
   .pipe(gulp.dest(dest))
   .pipe($.size());
   */
});