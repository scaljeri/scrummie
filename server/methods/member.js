Meteor.methods({
    upsertMember: function (member) {
        Members.upsert(
            { initials: member.initials},
            {$set: {name: member.name, initials: member.initials}}
        );
    },
    checkProfile: function () {
        var user = Scrummie.updateUserProfile(Meteor.user());
        if (user && user.profile) {
            Meteor.users.update({_id: user._id}, {$set: {profile: user.profile}});
        }
    },
    removeUserFromProject: function (userId, projectName) {
        var i, user, project, projects;

        if ( userId && (project = hasPermissionsInProject(projectName)) !== null) {
            user = Meteor.users.findOne({_id: userId});
            projects = user.projects;

            for (i = 0; i < projects.length; i++) {
                if (projects[i] === project._id) {
                    projects.splice(i, 1);
                    break;
                }
            }

            Meteor.users.update({_id: userId}, {$set: {projects: projects}});
        }
    },
    addUserToProject: function (userId, projectName) {
        var user, project;

        if ( userId && (project = hasPermissionsInProject(projectName)) !== null) {
            user = Meteor.users.findOne({_id: userId});

            user.projects.push(project._id);
            Meteor.users.update({_id: userId}, {$set: {projects: user.projects}});
        }
    }
});

/*
function hasPermissionsInProject(projectName) {
    var i, project = Projects.findOne({name: projectName}),
        projects = Meteor.user().projects;

    for (i = 0; i < projects.length; i++) {
        if (projects[i] === project._id) {
            return project;
        }
    }

    return null;
}
*/