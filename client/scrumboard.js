Template.scrumboard.lanes = function () {
    return Lanes.find({}, {sort: {index: 1}}).fetch();
};

Template.scrumboard.tasksOnLane = function(laneId) {
  return Tasks.find({laneId: laneId}).count();
};

Template.scrumboard.rendered = function () {
    //var lanes = Lanes.find({}).fetch();
};

