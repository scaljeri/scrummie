/* This function can only be used on documents who belong to a project */
isDocumentEditable = function (document) {
    var ok = false, projects;
    if (Meteor.user()) {
        projects = Meteor.user().projects;

       for( var i = 0; i < projects.length; i++) {
            if (document.projectId === projects[i]) {
                ok = true;
            }
       }
    }
    return ok;
};