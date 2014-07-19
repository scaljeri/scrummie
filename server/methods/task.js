Meteor.methods({
    touchTask: function (id) {
        var origTask = Tasks.findOne({_id: id});

        if (isDocumentEditable(origTask)) {
            Task.update({_id: id}, {$set: {updated: new Date().getTime()}});
        }
    },
    upsertTask: function (projectName, task) {
        var retVal = {status: 'error', msg: 'Not authorized'}, project,
            origTask = Tasks.findOne({_id: task._id});

        if (isDocumentEditable(origTask)) {
            project = Projects.findOne({name: projectName});

            if (project) {
                if (Array.isArray(task.color)) {
                    var colors = task.color, x = 0, y = 8;

                    for (var i = 0; i < colors.length; i++) {
                        task.color = colors[i];
                        delete task._id; // is this needed ?
                        task.x = (x += 3);
                        task.y = (y += 3);
                        if ((retVal = upsertTask(project._id, task)).status === 'error') {
                            break;
                        }
                    }
                }
                else {
                    retVal = upsertTask(project._id, task);
                }
            }
            else {
                retVal = {status: 'error', msg: 'Project `' + projectName + '` does not exist'};
            }
        }

        return retVal;
    },
    deleteTask: function (id) {
        var origTask = Tasks.findOne({_id: id});

        if (isDocumentEditable(origTask)) {
            Tasks.update({_id: id}, {$set: {deleted: true}});
        }
    },
    cloneTask: function (task) {
        var origTask = Tasks.findOne({_id: task._id});
        replaceColor(task, origTask.projectId);

        if (isDocumentEditable(origTask)) {
           delete task.sprintNumber;

           for( var prop in origTask) {
               if (origTask.hasOwnProperty(prop) && !task[prop]) {
                  task[prop] = origTask[prop];
               }
           }

           delete task._id;
           task.updated = new Date().getTime();
           task.x += 5;
           task.y += 5;
           Tasks.insert(task);
        }
    },
    updatePostitPosition: function (task) {
        var origTask = Tasks.findOne({_id: task._id});

        if (isDocumentEditable(origTask)) {
            var fields = {
                    x: task.x,
                    y: task.y,
                    updated: new Date().getTime(),
                    laneId: task.laneId,
                    moves: (origTask.moves||0) + 1
                },
                lane = LanesSetup.findOne({_id: task.laneId});

            if (lane.title === 'done' && origTask.laneId !== lane._id) {
                HipChat(origTask);
            }

            if (lane.title !== 'todo' && !origTask.memberId) {
                fields.memberId = (Meteor.user()||{})._id;
            }

            Tasks.update({_id: task._id}, {$set: fields});
        }
        else {
            return {status: 'error'}; // should never happen
        }
    }
});

function replaceColor(task, projectId) {
    if (task.color !== undefined) {
        var color = TaskColorsSetup.findOne({projectId: projectId, value: task.color});
        task.colorId = color._id;
        delete task.color;
    }
}

function upsertTask(projectId, task) {
    var _id;

    replaceColor(task, projectId);

    if (!task.sprintNumber) { // new tasks do not have a sprint number yet
        var currentSprint = Sprints.findOne({projectId: projectId, active: true});

        if (currentSprint) { // first define a sprint
            task.sprintNumber = currentSprint.sprintNumber;
        }
        else {
            return {status: 'error', msg: 'No active Sprint'}; // TODO: doesn't work
        }

        var lane = LanesSetup.findOne({projectId: projectId, index: 0}); // find first lane
        task.laneId = lane._id;

        if (task.x === undefined) {
            task.x = 0;
            task.y = 5;
        }
    }
    task.sprintNumber = parseInt(task.sprintNumber); // TODO: is this really necessary
    task.updated = new Date().getTime();
    task.inserted = task.updated;
    task.projectId = projectId;
    task.creatorId = (Meteor.user()||{})._id;
    task.createdInSprint = parseInt(task.sprintNumber);

    _id = task._id;
    delete task._id;

    Tasks.upsert({_id: _id}, {$set: task});
    return {status: 'ok'};
}