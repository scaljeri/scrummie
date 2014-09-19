gulp.task('clean', function() {
    var rimraf = require('gulp-rimraf');

    return gulp.src(['./tmp',
                     'meteor/public',
                     'meteor/client',
                     'meteor/server',
                     'meteor/lib',
                     'meteor/routes'], {read:false})
        .pipe(rimraf());
});