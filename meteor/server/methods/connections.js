var crypto = Meteor.npmRequire('crypto'),
    algorithm = 'aes256';

Meteor.methods({
    updateConnection: function (cType, projectName, options) {
        var update, settings, project, cTypes = {jira: true, hipchat: true};

        if (hasPermissionsInProject(projectName)) {
            if (cTypes[cType] && (project = hasPermissionsInProject(projectName))) {
                settings = Settings.findOne({projectId: project._id});
                update = settings.connections || {};

                if (!update[cType]) {
                    update[cType] = {};
                }

                Object.keys(options).forEach(function (key) {
                    update[cType][key] = options[key];
                });

                if (update[cType].password) {
                    var cipher = crypto.createCipher(algorithm, 'KJHG7yg)a1(_');
                    update[cType].password = cipher.update(update[cType].password, 'utf8', 'hex') + cipher.final('hex');
                }

                Settings.update({_id: settings._id}, {$set: {connections: update}});
            }
        }
    }
});