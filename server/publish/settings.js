Meteor.startup(function () {
    var isAdded = false;

    Meteor.reactivePublish('settings', function (projectName) {
        var connections = {}, project, settings;

        if (projectName) {
            project = Projects.findOne({name: projectName}),
            settings = Settings.findOne({projectId: project._id}, {reactive: true});

            connections.jira = setupJira(settings.jira);
            //connections.hipchat = setupHipchat(settings.hipchat);

        }

        try { // TODO: The try/catch is a hack
            this.removed('settings', 'settings');
        } catch (e) {
        }

        //if (!isAdded) {
        this.added("settings", "settings", {
            isAuth: isAuthenticationEnabled(),
            connections: connections,
            projectId: (project||{})._id
        });
        /*}
         isAdded = true;
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

function isAuthenticationEnabled() {
    // currently only github authentication is implemented
    var settings = Meteor.settings;
    return settings && settings.authentication && settings.authentication.github &&
           settings.authentication.github.visible === true;
}

function getService(key) {
    var service = {};

    if (Meteor.settings && Meteor.settings.services) {
        service = Meteor.settings.services[key];
    }

    return service;

}

function setupJira(settings) {
    var retVal = null, service;

    if (settings) {
        service = getService('jira');

        // if visible is `false` it will not show up in the configuration
        if (service.visible === true) {
            retVal = {
                username: settings.username,
                checked: settings.checked, // if false it will not show up in the 'create task' menu
                projectName: settings.projectName
            };
        }

    }

    return retVal;
}

function setupHipchat(settings) {
    if (Meteor.settings.hipchat && Meteor.settings.hipchat.active === true) {
        if (settings.hipchat) {
            connections.hipchat = { checked: settings.hipchat.checked, roomId: settings.hipchat.roomId};
        }
        else {
            connections.hipchat = {checked: false};
        }
    }
}
