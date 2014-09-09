gulp.task('js', function () {
  var jshint = require('gulp-jshint'),
    es =  require('event-stream');

  var options = {
    jshint: {
      globals: {
        $: true,
        _: true,
        angular: true,
        FileReader: true, /* JSHint doesn't know about the FileReader API */
        jQuery: true
      },
      globalstrict: true,
      strict: false,
      '-W030': true,
      '-W083': true
    }
  };

  return es.merge(
      gulp.src([
        'sources/scrummie.js'
      ])
        //.pipe(jshint(options.jshint))
        //.pipe(jshint.reporter('default'))
          .pipe(gulp.dest('target/')),

      gulp.src([
        'sources/server/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest('target/server/')),

      gulp.src([
        'sources/lib/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest('target/lib/')),

      gulp.src([
        'sources/routes/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest('target/routes/')),

      gulp.src([
        'sources/client/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest('target/client/')),

      gulp.src([
        'sources/public/js/**/*'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest('target/public/js/'))
  );
});