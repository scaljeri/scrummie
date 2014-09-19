var deferred = Q.defer();

gulp.task('bundle', function () {
    fs.stat('./tmp', function (err, stats) {
        if (err) {
            fs.mkdirSync('./tmp');
        }
        changeDirTo('./meteor', createBundle);
    });

    return deferred.promise;
});

function changeDirTo(path, cb) {
    try {
        process.chdir(path);
        cb();
    }
    catch (err) {
        deferred.reject(new Error('Failed to change the directory from ' + process.pwd() + ' to: ' + path));
    }

}

function createBundle() {
    try {
        gutil.log('        ', 'Create bundle' );
        if (exec('meteor bundle ../tmp/bundle.tgz').code === 0) {
            console.log("bundle created");
            changeDirTo('../tmp/', unpackBundle);
        }
        else {
            deferred.reject(new Error('Could not create the bundle'));
        }
    } catch (e) {
        console.log("Failed to create the bundle");
        deferred.reject();
    }
}

function unpackBundle() {
    if (exec('tar -zxf ./bundle.tgz').code === 0) {
        changeDirTo('bundle/programs/server', updateBundle);
    }
    else {
        deferred.reject(new Erro('Could not unpack the bundle'));
    }
}

function updateBundle() {
    if (exec('npm install > /dev/null 2>&1').code === 0) {
        if (exec('rm -r node_modules/fibers').code === 0) {
            changeDirTo('../..', modifyBundle);
        }
        else {
            deferred.reject(new Error('Could not remove fibers'));
        }
    }
    else {
        deferred.reject(new Error('Could not install (npm) missing dependencies inside the bundle (' + process.cwd() + ')'));
    }
}

function modifyBundle() {
    if (exec('cp ' + settingsFile + ' ./scrummie.json').code === 0) {
        if (exec('mv main.js server.js').code === 0) {
            changeDirTo('../', createNewBundle);
        }
        else {
            deferred.reject(new Error('Could not rename main.js'));
        }
    }
    else {
        deferred.reject(new Error('Could not copy ' + settings + ' into the bundle directory (' + process.cwd() + ')'));
    }
}
function createNewBundle() {
    if (exec('tar -zcf ../bundle.tgz bundle ').code === 0) {
        deferred.resolve();
    }
    else {
        deferred.reject('Could not create new bundle file');
    }
}
