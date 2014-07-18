Meteor.startup(function () {
    Meteor.publish('settings', function (projectName) {
        var enabled = Meteor.settings.authenticate === undefined ? false : Meteor.settings.authenticate;

        if (projectName) {
            var project = Projects.findOne({name: projectName}),
                settings = Settings.find({projectId: project._id}),
                connections = {};

            if (settings.jira) {
                connections.jira = {username: settings.jira.username, checked: settings.jira.checked};
            }
            else {
                connections.jira = {checked: false};
            }

            if (settings.hipchat) {
                connections.hipchat = {};
            }
            else {
                connections.hipchat = {checked: false};
            }
        }

        this.added("settings", "settings", {
            isAuth: enabled,
            connections: connections
        });

        this.ready();
    });
});