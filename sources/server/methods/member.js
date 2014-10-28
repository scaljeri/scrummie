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
  removeMemberFromProject: function (memberId, projectName) {
    if (memberId && hasPermissionsInProject(projectName) !== null) {
      Members.update({_id: memberId}, {$set: {deleted: true}});
    }
  },
  removeUserFromProject: function (userId, projectName) {
    var i, user, project, projects;

    if (userId && (project = hasPermissionsInProject(projectName)) !== null) {
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
  upsertUserToProject: function (input, projectName) {
    var user, userId = input, project, query;

    if (input && (project = hasPermissionsInProject(projectName)) !== null) {
      if (typeof(userId) === 'object') {
        if (input._id) {
          Members.update({_id: input._id}, {$set: { profile: {name: input.name}, initials: input.initials, projects: [project._id]}});
        }
        else if (input.name) {
          if (!input.initials) {
            input.initials = input.name.match(/\b(\w)/g).join('');
          }
          Members.insert({profile: {name: input.name}, initials: input.initials, projectId: project._id});
        }
      }
      else {
        user = Meteor.users.findOne({_id: userId});
        user.projects.push(project._id);
        Meteor.users.update({_id: userId}, {$set: {projects: user.projects}});
      }
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