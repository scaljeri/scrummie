Meteor.methods({
    updateConnection: function (cType, projectName, options) {
        var update = {}, settings;

        if (hasPermissionsInProject(projectName)) {
            settings = Settings.findOne({name: projectName});


            if (settings && settings[cType]) {
                update[cType] = settings[cType];

                Object.keys(options).forEach(function(key){
                    update[cType][key] = options[key];
                });

                Settings.update({_id: settings._id}, {$set: update});
            }
        }
    }
});