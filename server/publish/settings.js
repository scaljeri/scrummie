Meteor.startup(function () {
    var isAdded = false;

    Meteor.reactivePublish('settings', function (projectName) {
        var enabled = Meteor.settings.authenticate === undefined ? false : Meteor.settings.authenticate,
            connections = {}, project, settings;

        if (projectName) {
            project = Projects.findOne({name: projectName}),
            settings = Settings.findOne({projectId: project._id}, {reactive: true});

            if (Meteor.settings.jira && Meteor.settings.jira.active === true) {
                connections.jira = settings.jira ?
                    {username: settings.jira.username, checked: settings.jira.checked, projectName: settings.jira.projectName} :
                    {checked: false};
            }


            if (Meteor.settings.hipchat && Meteor.settings.hipchat.active === true) {
                if (settings.hipchat) {
                    connections.hipchat = { checked: settings.hipchat.checked, roomId: settings.hipchat.roomId};
                }
                else {
                    connections.hipchat = {checked: false};
                }
            }
        }

        try { // TODO: The try/catch is a hack
            this.removed('settings', 'settings');
        } catch (e) {
        }

        //if (!isAdded) {
        this.added("settings", "settings", {
            isAuth: enabled,
            connections: connections,
            projectId: project._id
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