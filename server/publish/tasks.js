Meteor.startup(function () {
  Meteor.reactivePublish('tasks', function (projectId) {
    var sprint = Sprints.findOne({active: true, projectId: projectId}, {reactive: true});

    return Tasks.find({$and: [
      {projectId: projectId},
      {sprintNumber: sprint ? sprint.sprintNumber : -10},
      {$or: [
        {deleted: {$exists: false}},
        {deleted: false}
      ]}
    ]}, {fields: {x: 0, y: 0, updated: 0}});          // return task without coordinates
  });

  Meteor.reactivePublish('task-positions', function (projectId) {
    var sprint = Sprints.findOne({active: true, projectId: projectId}, {reactive: true});
    return Tasks.find({$and: [
        {projectId: projectId},
        {sprintNumber: sprint ? sprint.sprintNumber : -10},
        {$or: [
          { deleted: {$exists: false}},
          {deleted: false}
        ]}
      ]},
      {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
  });
});