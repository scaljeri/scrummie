App = {};

if (Meteor.isServer)
    Inject.obj('settings', {baseUrl: 'scrummie/'});

if (Meteor.isClient) {
    subs = new SubsManager({
        // will be cached only 20 recently used subscriptions
        cacheLimit: 20,
        // any subscription will be expired after 5 minutes of inactivity
        expireIn: 5
    });

    App = {
        defaults: {},
        noob: function () {},
        scrumboard: {view: 'normal', readonly: false},
        subs: null,
        deps: {},
        outsideClick: {
            list: [],
            register: function (selector, callback, notDirty) {
                this.remove(callback);
                this.list.push({ selector: selector, callback: callback, dirty: notDirty === undefined ? true : false});
            },
            remove: function (callback) {
                this.list = _.filter(this.list, function (item) {
                    return item.callback !== callback;
                }) || [];
            }
        },
        ignoreClickFrom: {
            list: [],
            add: function (selector) {
                this.list.push(selector);
            }
        }
    };


    /* PRIVATE HELPER FUNCTIONS */
    function makeReactive(property, defaultValue) {
        var value = null,
            dep = new Deps.Dependency();

        Object.defineProperty(App, property, {
            set: function (newVal) {
                value = newVal;
                dep.changed();
            },
            get: function () {
                dep.depend();
                return value;
            }
        });

        if (typeof(defaultValue) !== undefined) {
            App[property] = defaultValue;
        }
    }

    makeReactive('selectedTask');
    makeReactive('selectedColors');
    makeReactive('filterColorId');
    makeReactive('isLoggedIn', false);
}

if (Meteor.isServer) {
    initializeLogger();

    Meteor.startup(function () {
        Future = Npm.require('fibers/future');
        /*
         Projects.remove({});
         Sprints.remove({});
         Lanes.remove({});
         LanesSetup.remove({});
         Tasks.remove({});
         TaskColors.remove({});
         TaskColorsSetup.remove({});
         Members.remove({});
         Resources.remove({});
         */
        if (Lanes.find({}).count() === 0) {
            Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
            Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
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

        // server
        Meteor.publish("users", function () {
            return Meteor.users.find({},
                {fields: {'profile': 1, 'projects': 1, initials: 1}});
        });


        Meteor.publish('comments', function (projectId, taskId) {
            return Comments.find({projectId: projectId, taskId: taskId}, {sort: {insertDate: 1}});
        });

        // stats
        Meteor.publish('velocity', function () {
            return;
        });

        Meteor.publish('burndown', function () { // stories
            return
        });
        Meteor.publish('burnup', function () {  // tasks
            return
        });
    });
}
