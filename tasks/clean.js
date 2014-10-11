gulp.task('clean-meteor', function() {
    var rimraf = require('gulp-rimraf');

    return gulp.src(['./tmp',
                     outputDir + 'public',
                     outputDir + 'client',
                     outputDir + 'server',
                     outputDir + 'lib',
                     outputDir + 'routes',
                     outputDir + 'index.html',
                     outputDir + 'scrummie.json',
                     outputDir + 'scrummie.js'
    ], {read:false})
        .pipe(rimraf());
});