Meteor.startup(function () {
  Meteor.publish('task-colors', function () {
    return TaskColors.find({}, {sort: {index: 1}});
  });

  Meteor.publish('task-colors-setup', function (project) {
    var document = Projects.findOne({name: project});

    if (document) {
      return TaskColorsSetup.find({projectId: document._id}, {sort: {index: 1}});
    }
  });
});