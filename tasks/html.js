gulp.task('html-to-meteor', function () {
  var es =  require('event-stream');

  return es.merge(
      gulp.src('sources/client/**/*.html')
          .pipe(assetpath({
            newDomain: config.baseUrl || '/.',
            oldDomain: 'http://localhost:3000/',
            filetypes: ['png', 'jpg'],
            docRoot: '/'
          }))
          .pipe(gulp.dest('meteor/client/')),
      gulp.src('sources/index.html')
          .pipe(assetpath({
            newDomain: config.baseUrl || '/.',
            oldDomain: 'http://localhost:3000/',
            filetypes: ['js', 'css', 'ico'],
            docRoot: '/'
          }))
          .pipe(gulp.dest('meteor/'))
  );
});