Meteor.methods({
    saveGithubCredentials: function (label, clientId, clientSecret, projectName) {
        var project = Projects.findOne({name: projectName}),
            settings;

        if (project) {
            settings = Settings.findOne({projectId: project._id});

            if (hasPermissionsInProject(projectName)) {
               Settings.update()
               settings.github = {
                   label: label,
                   clientId: clientId,
                   clientSecret: clientSecret
               }
            }
        }
    },
    saveJiraCredentials: function (/* arguments */) {

    }
});