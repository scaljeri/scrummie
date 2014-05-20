if (Meteor.isServer) {
// Global configuration
  RESTstop.configure({
    use_auth: false
  });

// Maps to: /api/get_user
  RESTstop.add('project/:project/sprint/:sprint/tasks', function () {
    return loadTasks(this.params.project, this.params.sprint);
  });

  RESTstop.add('project/:project/tasks', function () {
    return loadTasks(this.params.project);
  });

  RESTstop.add('project/:project/sprint/:sprint/lane/:lane/tasks', function () {
    return loadTasks(this.params.project, this.params.sprint, this.params.lane);
  });

  RESTstop.add('project/:project/lane/:lane/tasks', function () {
    return loadTasks(this.params.project, undefined, this.params.lane);
  });

// Maps to, for example: /api/get_num/42
  /*
   RESTstop.add('get_num/:num?', function() {
   if (! this.params.num) {
   return [403, {
   success: false,
   message: 'You need a num as a parameter!'
   }];
   }

   return this.params.num;
   });
   */
}

function loadTasks(project, sprint, lane) {
  var re, laneObj, sprintObj, sprintQuery = {projectId: project}, query = { $and: [
    {projectId: project},
    {$or: [
      {deleted: {$exists: false}},
      {deleted: false}
    ]}
  ]},
    colors  = makeHash(TaskColorsSetup.find({projectId: project}).fetch()),
    lanes   = makeHash(LanesSetup.find({projectId: project}).fetch()),
    members = makeHash(Members.find({projectId: project}).fetch());

  if (sprint === undefined) {
    sprintQuery.active = true;
  }
  else {
    sprintQuery.sprintNumber = parseInt(sprint);
  }
  sprintObj = Sprints.findOne(sprintQuery);
  if (!sprintObj) {
      return [404, { success: false, message: sprint ? 'Sprint ' + sprint + ' does not exist' : 'No active sprint' }];
  }
  query['$and'].push({sprintNumber: sprintObj.sprintNumber});

  if (lane) {
    re = new RegExp('^' + lane);
    laneObj = LanesSetup.findOne({projectId: project, title: re});
    if (!laneObj) {
      return [404, { success: false, message: 'Lane "' + lane + '" does not exist' }];
    }
    else {
      query['$and'].push({laneId: laneObj._id});
    }
  }

  var output = {tasks: []};
  Tasks.find(query, {sort: {updated: 1}/*, fields: {_id: 0}*/}).forEach(function(task) {
    var color = colors[task.colorId];
    if (color) {
      task.color = color.value;
    }
    delete task.colorId;

    task.lane = lanes[task.laneId].title;
    delete task.laneId;

    if (task.memberId) {
        task.member = members[task.memberId].name;
    }
    delete task.memberId;

    if (!task.link) {
      delete task.link;
    }
    output.tasks.push(task);
  });
  return output;
}

function makeHash(list) {
  var output = {};
  list.forEach(function (item) {
    output[item._id] = item;
  });
  return output;
}