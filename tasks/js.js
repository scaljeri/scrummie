gulp.task('js-to-meteor', function () {
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
        inputDir + 'sources/scrummie.js'
      ])
        //.pipe(jshint(options.jshint))
        //.pipe(jshint.reporter('default'))
          .pipe(gulp.dest(outputDir)),

      gulp.src([
        inputDir + 'sources/server/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest(outputDir + 'server/')),

      gulp.src([
        inputDir + 'sources/lib/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest(outputDir + 'lib/')),

      gulp.src([
        inputDir + 'sources/routes/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest(outputDir + 'routes/')),

      gulp.src([
        inputDir + 'sources/client/**/*.js'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest(outputDir + 'client/')),

      gulp.src([
        inputDir + 'sources/public/js/**/*'
      ])
          .pipe(jshint(options.jshint))
          .pipe(jshint.reporter('default'))
          .pipe(gulp.dest(outputDir + 'public/js/'))
  );
});