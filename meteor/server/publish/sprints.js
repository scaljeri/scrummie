Meteor.startup(function () {
  Meteor.publish('sprint', function (project, sprintNumber) {
    var query, document = Projects.findOne({name: project});

    if (document) {
      query = { projectId: document._id };
      if (sprintNumber) {
        query.sprintNumber = sprintNumber;
      }

      //return Sprints.find({ startDate: {$gt: new Date().getTime()}, endDate: { $lt: new Date().getTime()}});
      return Sprints.find(query, {limit: 1, sort: {sprintNumber: -1}});
    }

    this.ready();
  });
});