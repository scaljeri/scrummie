Meteor.startup(function () {
  Meteor.publish('lanes', function () {
    return Lanes.find({}, {sort: {index: 1}});
  });

  Meteor.publish('lanes-setup', function (project) {
    var document = Projects.findOne({name: project});

    if (document) {
      return LanesSetup.find({projectId: document._id}, {sort: {index: 1}});
    }
  });
});