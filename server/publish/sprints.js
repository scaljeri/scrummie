Meteor.startup(function () {
  Meteor.publish('sprint', function (projectId, sprintNumber) {
    var query = { projectId: projectId};
    if (sprintNumber) { // TODO: rename sprintNumber to number in Collection
      query.sprintNumber = sprintNumber;
    }

    //return Sprints.find({ startDate: {$gt: new Date().getTime()}, endDate: { $lt: new Date().getTime()}});
    return Sprints.find(query, {limit: 1, sort: {sprintNumber: -1}});
  });
});