/* This function can only be used on documents who belong to a project */
isDocumentEditable = function (document) {
    var ok = false, projects;
    if (Meteor.user()) {
        if (document) {
            projects = Meteor.user().projects;

            for (var i = 0; i < projects.length; i++) {
                if (document.projectId === projects[i]) {
                    ok = true;
                }
            }
        }
        else { // without a document it only matters if we have a user
            ok = true;
        }
    }
    return ok;
};