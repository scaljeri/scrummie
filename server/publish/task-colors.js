Meteor.startup(function () {
  Meteor.publish('task-colors', function () {
    return TaskColors.find({}, {sort: {index: 1}});
  });

  Meteor.publish('task-colors-setup', function (projectId) {
    return TaskColorsSetup.find({projectId: projectId}, {sort: {index: 1}});
  });
});