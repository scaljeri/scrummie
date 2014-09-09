gulp.task('clean', function() {
    var rimraf = require('gulp-rimraf');

    return gulp.src(['./tmp',
                     'target/public',
                     'target/client',
                     'target/server',
                     'target/lib',
                     'target/routes'], {read:false})
        .pipe(rimraf());
});