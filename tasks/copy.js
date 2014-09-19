gulp.task('copy', function () {
  var es =  require('event-stream');

  return es.merge(
      // CSS
      gulp.src([
        'bower_components/jquery-ui/themes/base/**/*'
      ])
          .pipe(gulp.dest('meteor/public/styles/jquery-ui/')),

      gulp.src([
        'bower_components/select2/select2x2.png',
        'bower_components/select2/select2.css'
      ])
          .pipe(gulp.dest('meteor/public/styles/')),

      // IMAGES
      gulp.src([
        'sources/public/img/**/*'
      ])
          .pipe(gulp.dest('meteor/public/img/')),

      // JS
      gulp.src([
        'bower_components/jquery/dist/jquery.min.js'
      ])
          .pipe(gulp.dest('meteor/public/js/')),

      gulp.src([
        'bower_components/jquery-ui/ui/jquery-ui.js'
      ])
          .pipe(gulp.dest('meteor/public/js/')),

      gulp.src([
        'bower_components/underscore/underscore.js'
      ])
          .pipe(gulp.dest('meteor/public/js/')),

      gulp.src([
        'bower_components/select2/select2.js'
      ])
          .pipe(gulp.dest('meteor/public/js/')),

      gulp.src([
        'bower_components/d3/d3.js'
      ])
          .pipe(gulp.dest('meteor/public/js/')),

      gulp.src([
        'bower_components/nvd3/nv.d3.js'
      ])
          .pipe(gulp.dest('meteor/public/js/')),

      gulp.src([
        'bower_components/jsdiff/diff.js'
      ])
          .pipe(gulp.dest('meteor/public/js/'))
  );
});