Meteor.methods({
    upsertSprint: function (sprint) {
       var _id = Sprints.upsert({ sprintNumber: parseInt(sprint.sprintNumber)}, {
            $set: {
                startdate: sprint.startdate,
                enddate: sprint.enddate,
                active: sprint.active
            }
        });

        if (sprint.status === 'open') {

        }


    },
    upsertMember: function (member) {
        Members.upsert(
            { initials: member.initials},
            {$set: {name: member.name, initials: member.initials}}
        );
    },
    touchTask: function (id) {
        Task.update({_id: id}, {$set: {updated: new Date().getTime()}});
    },
    upsertTask: function (task) {
        var retVal = null;
        if (Array.isArray(task.color)) {
            var colors = task.color;
            for( var i = 0; i < colors.length; i++) {
                task.color = colors[i];
                delete task._id;
                if ( (retVal = upsertTask(task)).status === 'error' ) {
                    break;
                }
            }
        }
        else {
            retVal = upsertTask(task);
        }

        return retVal;
    },
    updatePostitPosition: function (task) {
        console.dir(task);
        Tasks.update({_id: task._id}, {$set: {x: task.x, y: task.y, updated: new Date().getTime(), laneId: task.laneId}});
    }
});

function upsertTask(task) {
    if (task.color !== undefined) {
        var color = TaskColors.findOne({value: task.color});
        task.colorId = color._id;
        delete task.color;
    }

    if (!task.sprintNumber) { // new tasks do not have a sprint number yet
        var currentSprint = Sprints.findOne({active: true});

        if (currentSprint) { // first define a sprint
            task.sprintNumber = currentSprint.sprintNumber;
        }
        else {
            return {status: 'error', msg: 'No active Sprint'}; // TODO: doesn't work
        }

        var lane = Lanes.findOne({index: 0}); // find first lane
        task.laneId = lane._id;
        task.x = 0;
        task.y = 0;
    }
    task.updated = new Date().getTime();
    var _id = task._id;
    delete task._id;

    console.log("BEFORE INSERT");
    console.dir(task);

    Tasks.upsert({_id: _id}, {$set: task});
    return {status: 'ok'};
}
