Meteor.startup(function () {
  Meteor.publish('lanes', function () {
    return Lanes.find({}, {sort: {index: 1}});
  });

  Meteor.publish('lanes-setup', function (project) {
    return LanesSetup.find({projectId: project}, {sort: {index: 1}});
  });
});