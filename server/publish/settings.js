Meteor.startup(function () {
    var isAdded = false;

    Meteor.reactivePublish('settings', function (projectName) {
        var enabled = Meteor.settings.authenticate === undefined ? false : Meteor.settings.authenticate;

        if (projectName) {
            var project = Projects.findOne({name: projectName}),
                settings = Settings.findOne({projectId: project._id}, {reactive: true}),
                connections = {};

            if (settings.jira) {
                connections.jira = {username: settings.jira.username, checked: settings.jira.checked};
            }
            else {
                connections.jira = {checked: false};
            }

            if (settings.hipchat) {
                connections.hipchat = { checked: settings.hipchat.checked};
            }
            else {
                connections.hipchat = {checked: false};
            }
        }

        try { // TODO: Find out why the try/catch is necessary
            this.removed('settings', 'settings');
        } catch(e){}

        //if (!isAdded) {
            this.added("settings", "settings", {
                isAuth: enabled,
                connections: connections
            });
            isAdded = true;
        /*}
        else {

            console.log("Cahnging id=" + settings);
            this.changed('settings', 'settings', {
                isAuth: enabled,
                connections: connections
            });
        }*/

        this.ready();
    });
});