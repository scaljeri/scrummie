var RESTstop = null;

if (Meteor.isServer && false) {
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
    var re, laneObj, sprintObj, sprintQuery, query, colors, lanes, members, users;

    project = Projects.findOne({name: project});
    sprintQuery = {projectId: project._id};
    query = { $and: [
        {projectId: project._id},
        {$or: [
            {deleted: {$exists: false}},
            {deleted: false}
        ]}
    ]};
    colors = makeHash(TaskColorsSetup.find({projectId: project._id}).fetch());
    lanes = makeHash(LanesSetup.find({projectId: project._id}).fetch());
    members = makeHash(Members.find({projectId: project._id}).fetch());
    users = makeHash(Meteor.users.find({projects: {$in: [project._id]}}).fetch());

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
    query.$and.push({sprintNumber: sprintObj.sprintNumber});

    if (lane) {
        re = new RegExp('^' + lane);
        laneObj = LanesSetup.findOne({projectId: project._id, title: re});
        if (!laneObj) {
            return [404, { success: false, message: 'Lane "' + lane + '" does not exist' }];
        }
        else {
            query.$and.push({laneId: laneObj._id});
        }
    }

    var output = {tasks: []};
    Tasks.find(query, {sort: {updated: 1}/*, fields: {_id: 0}*/}).forEach(function (task) {
        var color = colors[task.colorId];
        if (color) {
            task.color = color.value;
        }
        delete task.colorId;

        task.lane = lanes[task.laneId].title;
        delete task.laneId;

        if (task.memberId) {
            var member = (Meteor.settings||{}).authenticate === true ? users[task.memberId] : members[task.memberId];
            if (member) {
                task.member = member.profile.name;
            }
        }
        delete task.memberId;

        if (!task.link) {
            delete task.link;
        }

        delete task.projectId;
        task.project = project.name;

        task.updated = new Date(task.updated);

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