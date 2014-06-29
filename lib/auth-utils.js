/* This function can only be used on documents who belong to a project */

isDocumentEditable = function (document) {
    var isEditable = false, projects;

    if (Meteor.user()) {
        if (document) {
            projects = Meteor.user().projects;

            if (projects !== undefined && projects.length > 0) {
                for (var i = 0; i < projects.length; i++) {
                    if (document.projectId === projects[i]) {
                        isEditable = true;
                    }
                }
            }
        }
        else { // without a document it only matters if we have a user
            isEditable = true;
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

    return null;
};

isAuthenticated = function () {
    return Boolean((Meteor.isClient ? (Settings.findOne() || {}) : Meteor.settings).isAuth) === false || Meteor.user();
};