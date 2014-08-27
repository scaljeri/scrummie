var gulp = require('gulp'),
    es = require('event-stream'),
    $ = require('gulp-load-plugins')(),
    config = require('../scrummie.json');

var watch = require('gulp-watch'),
   plumber = require('gulp-plumber'),
   sass = require('gulp-sass'),
   assetpath = require('gulp-assetpaths');

gulp.task('styles', function () {
    var _sass = gulp.src('../scss/scrummie.scss')
        .pipe($.sass({
            errLogToConsole: true
            //imagePath: '/scrummie/'
        }))
        .pipe($.autoprefixer('last 2 versions'));


    var _css = gulp.src([
        '/animate.css/animate.css',
        //'/jquery-ui/themes/base/jquery-ui.css',
        //'/select2/select2.css',
        '/nvd3/nv.d3.min.css'], {root: '../public/bower_components'});

    es.merge(_css, _sass)
        .pipe($.concat('scrummie.css'))
        .pipe($.filelog())
        .pipe($.size())
        .pipe(assetpath({
	          newDomain: config.baseUrl || '/',
            oldDomain: 'http://localhost:3000/',
            filetypes : ['png', 'jpg'],
            docRoot: '/'
        }))
        .pipe(gulp.dest('../public/styles/'))

});

gulp.task('html', function () {
    gulp.src('resources/scrummie.html')
        .pipe(assetpath({
            newDomain: config.baseUrl || '/.',
            oldDomain: 'http://localhost:3000/',
            filetypes : ['js', 'css', 'ico'],
            docRoot: '/'
        }))
        .pipe(gulp.dest('../'));

    //gulp.src('../scss/scrummie.scss')

});


gulp.task('default', function () {
   gulp.watch([
   '../scss/**/*.scss'
   ], ['styles']);
});
