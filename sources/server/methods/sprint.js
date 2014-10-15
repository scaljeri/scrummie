Meteor.methods({
    checkIfSprintExists: function (projectName, sprintNumber) {
        var project = Projects.findOne({name: projectName}),
                retVal = {}, sprint;

        if (project) {
            sprint = Sprints.findOne({sprintNumber: sprintNumber, projectId: project._id});
            if (sprint) {
                retVal.present = true;
            }
            else {
                retVal.present = false;
            }
        }
        return retVal;

    },
    upsertSprint: function (projectName, sprintData) {
        var project, sprint;
        //var project = Projects.findOne({name: projectName});

        if ( (project = hasPermissionsInProject(projectName)) !== null) {
            sprint = Sprints.findOne({projectId: project._id, sprintNumber: sprintData.sprintNumber});

            if (sprintData.active && sprint) { // if new sprint -> remove old sprint with same number!
                Sprints.remove({projectId: project._id, sprintNumber: sprintData.sprintNumber});
                Tasks.remove({projectId: project._id, sprintNumber: sprintData.sprintNumber});
            }

            Sprints.upsert({ projectId: project._id, sprintNumber: parseInt(sprintData.sprintNumber)}, {
                $set: {
                    startdate: sprintData.startdate,
                    enddate: sprintData.enddate,
                    active: sprintData.active,
                    fte: sprintData.fte
                }
            });

            if (sprintData.active === false) { // its closed now -> clone unfinished tasks
                var tasks = Tasks.find({
                            projectId: project._id,
                            sprintNumber: parseInt(sprintData.sprintNumber)}).fetch(),
                        todoLaneId = LanesSetup.find({projectId: project._id}, {sort: {index: -1}}).fetch()[0]._id;

                tasks.forEach(function (task) {
                    if (task.laneId !== todoLaneId) {
                        delete task._id;
                        task.sprintNumber = -1;
                        Tasks.insert(task); // task cloned
                    }
                });
            }
            else if (!sprint) { // only copy old tasks to the new sprint if the sprint doesn't exist yet
                Tasks.find({projectId: project._id, sprintNumber: -1}).fetch().forEach(function (task) {
                    Tasks.update({_id: task._id}, {$set: {sprintNumber: parseInt(sprintData.sprintNumber)}});
                });
            }
        }
    }
});
