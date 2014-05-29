Meteor.startup(function () {
  Meteor.publish('members', function (projectId) {
    return Members.find({projectId: projectId}, {sort: {name: 1}});
  });
});