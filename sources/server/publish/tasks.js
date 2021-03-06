Meteor.startup(function () {
    Meteor.reactivePublish('tasks', function (projectName, id) {
        var sprint, project, query = {_id: id},
            ignoreFields = {fields: {}};

        if (!id) {
            project = Projects.findOne({name: projectName});
            ignoreFields = {fields: {x: 0, y: 0, updated: 0, history: 0}};

            if (!project) {
                return this.ready();
            }

            sprint = Sprints.findOne({active: true, projectId: project._id}, {reactive: true});

            query = {$and: [
                {projectId: project._id},
                {sprintNumber: sprint ? sprint.sprintNumber : -10},
                {$or: [
                    {deleted: {$exists: false}},
                    {deleted: false}
                ]}
            ]};
        }

        return Tasks.find(query, ignoreFields); // return task without coordinates and its history
        //return Tasks.find(query, {fields: {x: 0, y: 0, updated: 0, history: 0}}); // return task without coordinates and its history
    });

    Meteor.reactivePublish('task', function (projectName, taskId) {
        var sprint, project;

        if (taskId) {
            return Tasks.find({_id: taskId});
        }
        else {
            project = Projects.findOne({name: projectName});

            if (project) {
                sprint = Sprints.findOne({active: true, projectId: project._id}, {reactive: true});

                return Tasks.find({$and: [
                    {projectId: project._id},
                    {sprintNumber: sprint ? sprint.sprintNumber : -10},
                    {$or: [
                        {deleted: {$exists: false}},
                        {deleted: false}
                    ]}
                ]});
            }
        }

        this.ready();
    });

    Meteor.reactivePublish('task-positions', function (projectName) {
        var sprint, project = Projects.findOne({name: projectName});

        if (project) {
            sprint = Sprints.findOne({active: true, projectId: project._id}, {reactive: true});

            return Tasks.find({$and: [
                    {projectId: project._id},
                    {sprintNumber: sprint ? sprint.sprintNumber : -10},
                    {$or: [
                        { deleted: {$exists: false}},
                        {deleted: false}
                    ]}
                ]},
                {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
        }
    });
});