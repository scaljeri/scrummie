historyLog = {
  task: {
    create: function (projectId, printId, memberId, task) {
      history.insert({
        projectId: projectId,
        printId: sprintId,
        memberId: memberId,
        object: task._id,
        action: 'task'
      });
    },
    move: function () {

    },
    remove: function () {

    },
    update: function () {

    }
  }
};