// Collections
Sprints = new Meteor.Collection('sprints');
Lanes = new Meteor.Collection('lanes');
Tasks = new Meteor.Collection('tasks');
TaskColors = new Meteor.Collection('task-colors');
Members = new Meteor.Collection('members');



// Routes
Router.configure({
    layout: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});
//RsprintNumberouter.onBeforeAction('notFound');
Router.map(function () {
    this.route('/', {
        controller: 'SprintController'
        //action: 'start'
    });

    /*
    this.route('/:team', {
        controller: 'SprintController',
        action: 'start'
    });

    this.route('home', {
        path: '/:team/:sprint',
        controller: 'SprintController',
        action: 'start'
    });
    */
});

if (Meteor.isClient) {
    App = {
        subs: {
            sprint: Meteor.subscribe('sprint'),
            lanes: Meteor.subscribe('lanes'),
            tasks: Meteor.subscribe('tasks'),
            taskColors: Meteor.subscribe('task-colors'),
            taskPositions: Meteor.subscribe('task-positions'),
            members: Meteor.subscribe('members')
        },
        deps: {},
        outsideClick: {
            list: [],
            /*
            When a click is supposed to show a widget, this widget should be ignored when this
            click is handled in the outside-click code. Otherwise this click will show the widget
            and immediately close it again. So, when a widget is shown also set dirty to true

              App.outsideClick.isDirty = true;
              Template.configMenu.show();       // the widget registers itself for an outside-click

            */
            isDirty: false,
            register: function (selector, callback) {
                this.remove(callback);
                this.list.push({ selector: selector, callback: callback, ignore: this.isDirty});
            },
            remove: function (callback) {
                this.list = _.filter(this.list, function (item) {
                    return item.callback !== callback;
                })||[];
            }
        }
    };
    makeReactive('selectedTask');
    makeReactive('errorMessage');
    makeReactive('selectedColors');
    makeReactive('filterColorId');

    /* PRIVATE HELPER FUNCTIONS */
    function makeReactive(property, defaultValue) {
        var value = null,
            dep = new Deps.Dependency();

        Object.defineProperty(App, property, {
            set: function(newVal) {
                value = newVal||defaultValue;
                dep.changed();
            },
            get: function () {
                dep.depend();
                return value;
            }
        });
    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {

        /*
        Sprints.remove({});
        Lanes.remove({});
        Tasks.remove({});
        TaskColors.remove({});
        Members.remove({});
        */
        if (Lanes.find({}).count() === 0) {
            Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
            Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
            Lanes.insert({ title: 'test', message: 'Tasks under test', index: 2});
            Lanes.insert({ title: 'done', message: 'Tasks done', index: 1000000});
        }

        if (Sprints.find({}).count() === 0) {
            /*
            var endDate = new Date(),
                startDate = new Date().setDate(endDate.getDate() + 14);
            Sprints.insert({
                sprintNumber: 23,
                startDate: startDate,
                endDate: endDate.getTime(),
                status: 'started'
            });
            */
        }

        if (TaskColors.find({}).count() === 0) {
            TaskColors.insert({ value: '#ffff92', title: 'Frontend', index: 0});
            TaskColors.insert({ value: '#ffa2e7', title: 'Design', index: 1});
            TaskColors.insert({ value: '#73dcff', title: 'Backend', index: 2});
            TaskColors.insert({ value: '#93e89f', title: 'Unknown', index: 3});
            TaskColors.insert({ value: '#ff9999', title: 'Test', index: 4});
            TaskColors.insert({ value: '#a0a0ff', title: 'other', index: 5});
            TaskColors.insert({ value: '#9effe6', title: 'infra', index: 6});
        }

        if (Members.find({}).count() === 0) {
            Members.insert({name: 'Lucas Calje', initials: 'LC'});
            Members.insert({name: 'Joost van Dieten', initials: 'JD'});
        }

        Meteor.publish('task-colors', function () {
            return TaskColors.find({}, {sort: {index: 1}});
        });

        Meteor.publish('task-positions', function () {
            return Tasks.find({}, {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
        });

        Meteor.publish('tasks', function () {
            return Tasks.find({}, {sort: {index: 1}, fields: {x: 0, y: 0, updated: 0}});          // return task without coordinates
        });

        Meteor.publish('lanes', function () {
            return Lanes.find({}, {sort: {index: 1}});
        });

        Meteor.publish('sprint', function (sprintNumber) {

            if (sprintNumber) { // TODO: rename sprintNumber to number in Collection
                return Sprints.find({number: sprintNumber}, {limit: 1, sort: {sprintNumber: -1}});
            }
            else {
                //return Sprints.find({ startDate: {$gt: new Date().getTime()}, endDate: { $lt: new Date().getTime()}});
                return Sprints.find({}, {limit: 1, sort: {sprintNumber: -1}});
            }
        });

        Meteor.publish('members', function () {
            return Members.find({}, {sort: {name: 1}});
        });
    });
}
