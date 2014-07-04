Meteor.startup(function () {
  Meteor.publish('no-auth-members', function (projectName) {
    var project = Projects.findOne({name: projectName});

    if (project) {
        return Members.find({$and: [
                {projectId: project._id},
                {$or: [
                    {deleted: {$exists: false}},
                    {deleted: false}
                ]}
            ]},
            {sort: {'profile.name': 1}}
        );
    }
  });
});