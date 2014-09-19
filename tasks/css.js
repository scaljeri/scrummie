gulp.task('css', function () {
  var es =  require('event-stream');

    var _sass = gulp.src('sources/scss/scrummie.scss')
        .pipe($.sass({
            errLogToConsole: true
            //imagePath: '/scrummie/'
        }))
        .pipe($.autoprefixer('last 2 versions'));


    var _css = gulp.src([
        'animate.css/animate.css',
        //'/jquery-ui/themes/base/jquery-ui.css',
        //'/select2/select2.css',
        '/nvd3/nv.d3.min.css'], {root: './bower_components'});

    return es.merge(_css, _sass)
        .pipe($.concat('scrummie.css'))
        //.pipe($.filelog())
        .pipe($.size())
        .pipe(assetpath({
            newDomain: config.baseUrl || '/.',
            oldDomain: 'http://localhost:3000/',
            filetypes : ['png', 'jpg'],
            docRoot: '/'
        }))
        .pipe(gulp.dest('meteor/public/styles/'));
});