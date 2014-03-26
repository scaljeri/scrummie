Sprints = new Meteor.Collection('sprints');
Lanes = new Meteor.Collection('lanes');
Tasks = new Meteor.Collection('tasks');
TaskColors = new Meteor.Collection('task-colors');


if (Meteor.isClient) {
    Meteor.subscribe('sprint-number');
    Meteor.subscribe('lanes');
    Meteor.subscribe('tasks');
    Meteor.subscribe('task-colors');
    Meteor.subscribe('task-positions');
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Lanes.find({}).count() === 0) {
            Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
            Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
            Lanes.insert({ title: 'test', message: 'Tasks under test', index: 2});
            Lanes.insert({ title: 'done', message: 'Tasks done', index: 3});
        }

        if (Sprints.find({}).count() === 0) {
            var endDate = new Date(),
                startDate = new Date().setDate(endDate.getDate() + 14);
            Sprints.insert({ sprintNumber: 23, startDate: startDate, endDate: endDate.getTime()});
        }

        if (TaskColors.find({}).count() === 0) {
            TaskColors.insert({ color: '#ffff92', title: 'Frontend', index: 0});
            TaskColors.insert({ color: '#ffa2e7', title: 'Design', index: 1});
            TaskColors.insert({ color: '#73dcff', title: 'Backend', index: 2});
            TaskColors.insert({ color: '#ff9999', title: 'Test', index: 3});
            TaskColors.insert({ color: '#a0a0ff', title: 'other', index: 3});
            TaskColors.insert({ color: '#9effe6', title: 'infra', index: 3});
        }

        Meteor.publish('task-colors', function () {
            return TaskColors.find({}, {sort: {index: 1}});
        });

        Meteor.publish('task-positions', function () {
            return TaskColors.find({}, {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
        });

        Meteor.publish('tasks', function () {
            return Tasks.find({}, {sort: {index: 1}, fields: {x: 0, y: 0, updated: 0}});          // return task without coordinates
        });

        Meteor.publish('lanes', function () {
            return Lanes.find({}, {sort: {index: 1}});
        });

        Meteor.publish('sprint-number', function () {
            return Sprints.find({ startDate: {$gt: new Date().getTime()}, endDate: { $lt: new Date().getTime()}});
        });
    });
}
