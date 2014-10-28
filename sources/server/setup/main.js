VERSIONS = {
    '0.0.1' : '0.0.2'
};

setupScrummie = function () {
    setupDatabase(); // initialize (first time only0

    // determine version of the application
    var projects = Projects.find().fetch();

    projects.forEach(function (project, index) {
        if (!project.version) { // if no version available yet
            updateProjectTo['0.0.1'](project);
            if (index === 0) {
                console.log('Update SCRUMMIE to version 0.0.1');
                updateSettingsTo['0.0.1']();
            }
        }
        else {
            //updateProjectTo[](project);
        }
    });
};
