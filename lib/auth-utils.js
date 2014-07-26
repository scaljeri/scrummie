/* This function can only be used on documents who belong to a project */

isDocumentEditable = function (document) {
    var isEditable = isAuthenticated(), projects;

    if (Meteor.user() && document) {
        isEditable = false;
        projects = Meteor.user().projects;

        if (projects !== undefined && projects.length > 0) {
            for (var i = 0; i < projects.length; i++) {
                if (document.projectId === projects[i]) {
                    isEditable = true;
                }
            }
        }
    }

    return isEditable;
};

hasPermissionsInProject = function (projectName) {
    var i, project = Projects.findOne({name: projectName}),
        projects = Meteor.user() ? Meteor.user().projects : null;

    if (project && projects) {
        for (i = 0; i < projects.length; i++) {
            if (projects[i] === project._id) {
                return project;
            }
        }
    }
    else if (!Meteor.user() && isAuthenticated()) { // --> authentication is disabled
        return project;
    }

    return null;
};

isAuthenticated = function () {
    var retVal = false;

    if (Meteor.isClient) {
        retVal = Boolean((Settings.findOne()||{}).authenticate) === false;
    }
    else {
        retVal = Boolean((Meteor.settings.authentication||{}).enabled) === false || Meteor.user();
    }
    return retVal;

    //return Boolean((Meteor.isClient ? (Settings.findOne() || {}) : Meteor.settings.).isAuth) === false || Meteor.user();
};