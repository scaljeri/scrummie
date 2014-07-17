Meteor.startup(function () {
    Meteor.publish('settings', function (projectName) {
        var enabled = Meteor.settings.authenticate === undefined ? false : Meteor.settings.authenticate;

        var project = Projects.findOne({name: projectName}),
            settings = Settings.find({projectId: project._id}),
            connections = {};

        if (settings.jira)  {
            connections.jira = {label: settings.jira.label, checked: settings.jira.checked};
        }
        else {
            connections.jira = {checked: true};
        }

        if (settings.github) {
            connections.github = {label: settings.github.label, checked: settings.github.checked};
        }
        else {
            connections.github = {checked: true};
        }

        this.added("settings", "settings", {
            isAuth: enabled,
            connections: connections
        });

        this.ready();
    });
});