updateProjectTo = {
    '0.0.1': function (project) {
        if (!project.version) {
            Projects.update(project, {$set: {
                version: '0.0.1'
            }});
        }
    }
};
