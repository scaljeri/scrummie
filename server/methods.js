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
                    sprintNumber: parseInt(sprint.sprintNumber)} ).fetch(),
                todoLaneId = Lanes.find({}, {sort: {index: -1}}).fetch()[0]._id;

            tasks.forEach(function (task) {
                if(task.laneId !== todoLaneId) {
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
                delete task._id; // is this needed ?
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
    deleteTask: function(id) {
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
