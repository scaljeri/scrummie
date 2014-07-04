Meteor.startup(function () {
  Meteor.publish('no-auth-members', function (projectName) {
    var project = Projects.findOne({name: projectName});

    if (project) {
        return Members.find({projectId: project._id}, {sort: {'profile.name': 1}});
    }
  });
});