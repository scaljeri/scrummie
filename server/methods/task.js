Meteor.methods({
  touchTask: function (id) {
    Task.update({_id: id}, {$set: {updated: new Date().getTime()}});
  },
  upsertTask: function (task) {
    var retVal = null;

    if (Array.isArray(task.color)) {
      var colors = task.color;
      for (var i = 0; i < colors.length; i++) {
        task.color = colors[i];
        delete task._id; // is this needed ?
        if ((retVal = upsertTask(task)).status === 'error') {
          break;
        }
      }
    }
    else {
      retVal = upsertTask(task);
    }

    return retVal;
  },
  deleteTask: function (id) {
    Tasks.update({_id: id}, {$set: {deleted: true}});
  },
  updatePostitPosition: function (task) {
    var fields = {
      x: task.x,
      y: task.y,
      updated: new Date().getTime(),
      laneId: task.laneId
    };

    if (task.memberId) {
      fields.memberId = task.memberId;
    }

    var oldTask = Tasks.findOne({_id: task._id});
    var msg = 'Task "' + oldTask.title + '" moved from ' + LanesSetup.findOne({_id: oldTask.laneId}).title + ' to ' + LanesSetup.findOne({_id: task.laneId}).title;
    HipChat(msg);

    Tasks.update({_id: task._id}, {$set: fields});

    /*{
     x: task.x,
     y: task.y,
     updated: new Date().getTime(),
     laneId: task.laneId,
     memberId: task.memberId}
     });*/
  }
});

function upsertTask(task) {
  if (task.color !== undefined) {
    var color = TaskColors.findOne({value: task.color});
    task.colorId = color._id;
    delete task.color;
  }

  if (!task.sprintNumber) { // new tasks do not have a sprint number yet
    var currentSprint = Sprints.findOne({projectId: task.projectId, active: true});

    if (currentSprint) { // first define a sprint
      task.sprintNumber = currentSprint.sprintNumber;
    }
    else {
      return {status: 'error', msg: 'No active Sprint'}; // TODO: doesn't work
    }

    var lane = Lanes.findOne({index: 0}); // find first lane
    task.laneId = lane._id;
    task.x = 0;
    task.y = 5;
  }
  task.sprintNumber = parseInt(task.sprintNumber);
  task.updated = new Date().getTime();
  var _id = task._id;
  delete task._id;

  console.log("BEFORE INSERT");
  console.dir(task);

  Tasks.upsert({_id: _id}, {$set: task});
  return {status: 'ok'};
}