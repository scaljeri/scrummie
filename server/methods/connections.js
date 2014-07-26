Meteor.methods({
    updateConnection: function (cType, projectName, options) {
        var update = {}, settings, project, cTypes = {jira: true, hipchat: true};

        if (hasPermissionsInProject(projectName)) {
            if (cTypes[cType] && (project = hasPermissionsInProject(projectName))) {
                settings = Settings.findOne({projectId: project._id});
                update[cType] = settings[cType] || {};

                Object.keys(options).forEach(function (key) {
                    update[cType][key] = options[key];
                });

                Settings.update({_id: settings._id}, {$set: update});
            }
        }
    }
});