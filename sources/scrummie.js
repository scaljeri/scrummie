/*
    Main file
 */
VERSION = '0.0.1';

subs = new SubsManager({
    // will be cached only 20 recently used subscriptions
    cacheLimit: 20,
    // any subscription will be expired after 5 minutes of inactivity
    expireIn: 5
});
var testing = null;

if (Meteor.isClient) {
    testing = App.settings.testing;

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
    //initializeLogger();
    testing = process.env.TESTING;

    Meteor.startup(function () {
        Future = Npm.require('fibers/future');

        setupScrummie(); // initialize db


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
            return;
        });
        Meteor.publish('burnup', function () {  // tasks
            return;
        });
    });
}

if (testing) {
    Meteor.user = (function () {
        return function user() {
            return Meteor.users.findOne({_id: testing});
        };
    })();
}
