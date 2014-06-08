


// Routes
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});
//RsprintNumberouter.onBeforeAction('notFound');
Router.map(function () {
    this.route('home', {
        path: '/',
        controller: 'HomeController'
    });
    this.route('project', {
        path: '/:project',
        controller: 'SprintController'
        //action: 'start'
    });

    this.route('task', {
        path: '/:project/task/:id',
        controller: 'TaskController'
    });

    this.route('stats', {
        path: '/:project/stats',
        controller: 'StatsController'
    });
});

if (Meteor.isClient) {
    App = {
        defaults: {},
        noob: function () {},
        scrumboard: {view: 'normal', readonly: false},
        subs: null,
        deps: {},
        outsideClick: {
            list: [],
            register: function (selector, callback) {
                this.remove(callback);
                this.list.push({ selector: selector, callback: callback, dirty: true});
            },
            remove: function (callback) {
                this.list = _.filter(this.list, function (item) {
                    return item.callback !== callback;
                }) || [];
            }
        }
    };


    console.dir(App);
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
    makeReactive('errorMessage');
    makeReactive('selectedColors');
    makeReactive('filterColorId');
    makeReactive('isLoggedIn', false);

    xyz = function () {
        console.log("-x-y-z-");
        if (App.isLoggedIn)    {
            console.log("true");
        }
    }
}

if (Meteor.isServer) {
    initializeLogger();

    Meteor.startup(function () {

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

        if (Members.find({}).count() === 0) {
            Members.insert({projectId: 'VOoruit', name: 'Anne Heijkoop', initials: 'AH'});
            Members.insert({projectId: 'VOoruit', name: 'Arjan Eising', initials: 'AE'});
            Members.insert({projectId: 'VOoruit', name: 'Jan Willem', initials: 'JW'});
            Members.insert({projectId: 'VOoruit', name: 'Jeroen Zwartenpoort', initials: 'JZ'});
            Members.insert({projectId: 'VOoruit', name: 'Joost van Dieten', initials: 'JD'});
            Members.insert({projectId: 'VOoruit', name: 'Lucas Calje', initials: 'LC'});
            Members.insert({projectId: 'VOoruit', name: 'Maurice de Chateau', initials: 'MC'});
            Members.insert({projectId: 'VOoruit', name: 'Sander van Geloven', initials: 'SG'});
            Members.insert({projectId: 'VOoruit', name: 'Joost den Boer', initials: 'JdB'});

            Members.insert({projectId: 'P3', name: 'Bob Bijvoet', initials: 'BB'});
        }


      /*
      Meteor.publish('projects', function (project) {
            var projects, query = {};

            if (project) {
                query.name = project;
            }
            projects = Projects.find(query, {sort: {name: 1}}, {reactive: true});
            projects.forEach(function (item) {
                var resource;

                if (item.resourceId) {
                  resource = Resources.findOne({_id: item.resourceId});
                  if (resource) {
                    item.icon = '/uploads/' + resource.fileName;
                    console.log(item.icon);
                  }
                }
            });

            return projects;
        });
        */


        /*
        Meteor.publish('task-positions', function (projectId, sprintNumber) {
            return Tasks.find({$and: [
                    {projectId: projectId},
                    {sprintNumber: sprintNumber},
                    {$or: [
                        { deleted: {$exists: false}},
                        {deleted: false}
                    ]}
                ]},
                {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
        });
        */

        /*
        Meteor.publish('tasksx', function (projectId, sprintNumber) {
            return Tasks.find({$and: [
                {projectId: projectId},
                {sprintNumber: sprintNumber},
                {$or: [
                    { deleted: {$exists: false}},
                    {deleted: false}
                ]}
            ]}, {fields: {x: 0, y: 0, updated: 0}});          // return task without coordinates
        });
        */



        // server
        Meteor.publish("userData", function () {
            if (this.userId) {
                return Meteor.users.find({_id: this.userId},
                    {fields: {'profile': 1, 'projects': 1}});
            } else {
                this.ready();
            }
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
