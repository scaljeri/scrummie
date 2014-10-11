gulp.task('copy-to-meteor', function () {
  var es =  require('event-stream');

  return es.merge(
      // CSS
      gulp.src([
        inputDir + 'bower_components/jquery-ui/themes/base/**/*'
      ])
          .pipe(gulp.dest(outputDir + 'public/styles/jquery-ui/')),

      gulp.src([
        inputDir + 'bower_components/select2/select2x2.png',
        inputDir + 'bower_components/select2/select2.css'
      ])
          .pipe(gulp.dest(outputDir + 'public/styles/')),

      // IMAGES
      gulp.src([
        inputDir + 'sources/public/img/**/*'
      ])
          .pipe(gulp.dest(outputDir + 'public/img/')),

      // JS
      gulp.src([
        inputDir + 'bower_components/jquery/dist/jquery.min.js'
      ])
          .pipe(gulp.dest(outputDir + 'public/js/')),

      gulp.src([
        inputDir + 'bower_components/jquery-ui/ui/jquery-ui.js'
      ])
          .pipe(gulp.dest(outputDir + 'public/js/')),

      gulp.src([
        inputDir + 'bower_components/underscore/underscore.js'
      ])
          .pipe(gulp.dest(outputDir + 'public/js/')),

      gulp.src([
        inputDir + 'bower_components/select2/select2.js'
      ])
          .pipe(gulp.dest(outputDir + 'public/js/')),

      gulp.src([
        inputDir + 'bower_components/d3/d3.js'
      ])
          .pipe(gulp.dest(outputDir + 'public/js/')),

      gulp.src([
        inputDir + 'bower_components/nvd3/nv.d3.js'
      ])
          .pipe(gulp.dest(outputDir + 'public/js/')),

      gulp.src([
        inputDir + 'bower_components/jsdiff/diff.js'
      ])
          .pipe(gulp.dest(outputDir + 'public/js/')),

      gulp.src(settingsFile)
        .pipe(gulp.dest(outputDir))
  );
});