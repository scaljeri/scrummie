Meteor.methods({
    touchTask: function (id) {
        var origTask = Tasks.findOne({_id: id});

        if (isDocumentEditable(origTask)) {
            Task.update({_id: id}, {$set: {updated: new Date().getTime()}});
        }
    },
    upsertTask: function (projectName, task) {
        var retVal = {status: 'error'}, project,
            origTask = Tasks.findOne({_id: task._id});

        if (isDocumentEditable(origTask)) {
            project = Projects.findOne({name: projectName});

            if (project) {
                if (Array.isArray(task.color)) {
                    var colors = task.color;
                    for (var i = 0; i < colors.length; i++) {
                        task.color = colors[i];
                        delete task._id; // is this needed ?
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
        var origTask = Tasks.findOne({_id: task._id});

        if (isDocumentEditable(origTask)) {
            Tasks.update({_id: id}, {$set: {deleted: true}});
        }
    },
    updatePostitPosition: function (task) {
        var origTask = Tasks.findOne({_id: task._id});

        if (isDocumentEditable(origTask)) {
            var fields = {
                    x: task.x,
                    y: task.y,
                    updated: new Date().getTime(),
                    laneId: task.laneId
                },
                lane = LanesSetup.findOne({_id: task.laneId});

            if (lane.title === 'done' && origTask.laneId !== lane._id) {
                HipChat(origTask, Projects.findOne({_id: origTask.projectId}).name, Members.findOne({_id: origTask.memberId}));
            }

            Tasks.update({_id: task._id}, {$set: fields});
        }
        else {
            return {status: 'error'}; // should never happen
        }
    }
});

function upsertTask(projectId, task) {
    var _id;

    if (task.color !== undefined) {
        var color = TaskColorsSetup.findOne({projectId: projectId, value: task.color});
        task.colorId = color._id;
        delete task.color;
    }

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
        task.x = 0;
        task.y = 5;
    }
    task.sprintNumber = parseInt(task.sprintNumber); // TODO: is this really necessary
    task.updated = new Date().getTime();
    task.projectId = projectId;

    _id = task._id;
    delete task._id;

    Tasks.upsert({_id: _id}, {$set: task});
    return {status: 'ok'};
}