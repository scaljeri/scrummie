Sprints = new Meteor.Collection('sprints');
Lanes = new Meteor.Collection('lanes');
Postits = new Meteor.Collection('postits');
Colors = new Meteor.Collection('colors');


if (Meteor.isClient) {
    Meteor.subscribe('lanes');
    Meteor.subscribe('sprint-number');
    Meteor.subscribe('colors');
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

        // TODO: needs to be done via sprint config screen
        if (Colors.find({}).count() === 0) {
            Colors.insert({ color: '#FFFF00', title: 'Frontend', index: 0});
            Colors.insert({ color: '#FF00FF', title: 'Design', index: 1});
            Colors.insert({ color: '#04B404', title: 'Backend', index: 2});
            Colors.insert({ color: '#04B404', title: 'Backend', index: 3});
            Colors.insert({ color: '#FFBF00', title: 'Test', index: 4});
        }

        Meteor.publish('colors', function () {
            return Colors.find({}, {sort: {index: 1}});
        });

        Meteor.publish('lanes', function () {
            return Lanes.find({}, {sort: {index: 1}});
        });

        Meteor.publish('sprint-number', function () {
            return Sprints.find({ startDate : {$gt : new Date().getTime()}, endDate : { $lt : new Date().getTime()}});
        });
    });
}
