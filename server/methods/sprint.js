Meteor.methods({
  upsertSprint: function (sprint) {
    var _id = Sprints.upsert({ sprintNumber: parseInt(sprint.sprintNumber)}, {
      $set: {
        projectId: sprint.projectId,
        startdate: sprint.startdate,
        enddate: sprint.enddate,
        active: sprint.active
      }
    });

    if (sprint.active === false) { // its closed now -> clone unfinished tasks
      var tasks = Tasks.find({
          projectId: sprint.projectId,
          sprintNumber: parseInt(sprint.sprintNumber)}).fetch(),
        todoLaneId = Lanes.find({}, {sort: {index: -1}}).fetch()[0]._id;

      tasks.forEach(function (task) {
        if (task.laneId !== todoLaneId) {
          delete task._id;
          task.sprintNumber = -1;
          Tasks.insert(task); // task cloned
        }
      });
    }
    else { // new sprint
      Tasks.find({projectId: sprint.projectId, sprintNumber: -1}).fetch().forEach(function (task) {
        Tasks.update({_id: task._id}, {$set: {sprintNumber: parseInt(sprint.sprintNumber)}});
      });
    }
  }
});
