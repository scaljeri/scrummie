SprintController = RouteController.extend({
    layoutTemplate: 'layout',

    onBeforeAction: function () {
        App.page = 'scrumboard';
        App.scrumboard.view = 'normal';
        App.scrumboard.readonly = false;
    },
    waitOn: function () {
        var project = App.defaults.project = this.params.project;

        if (App.subs) {
            for (name in App.subs) {
                App.subs[name].stop();
            }
        }

        App.subs = {
            settings: Meteor.subscribe('settings', project),
            projects: Meteor.subscribe('projects', project),
            sprint: Meteor.subscribe('sprint', project),
            lanes: Meteor.subscribe('lanes'),
            taskColors: Meteor.subscribe('task-colors'),
            members: Meteor.subscribe('members', project),
            lanesSetup: Meteor.subscribe('lanes-setup', project),
            taskColorsSetup: Meteor.subscribe('task-colors-setup', project),
            taskPositions: Meteor.subscribe('task-positions', project),
            tasks: Meteor.subscribe('tasks', project),
            users: Meteor.subscribe('users')
        };
        return [
            App.subs.settings,
            App.subs.projects,
            App.subs.lanes,
            App.subs.taskColors,
            App.subs.members,
            App.subs.lanesSetup,
            App.subs.taskColorsSetup,
            App.subs.tasks,
            App.subs.taskPositions,
            //App.subs.userData
            App.subs.user
        ];
    },
    data: function () {  // or a function
        return { pageCls: 'page-scrumboard'};
    }, /*

     run: function () {
     this.render() ; // or this.render('scrumboard') (default) or this.render('scrumboard', { data: {..}, waitOn: funct....

     this.render({
     'postShowSidebar': { to: 'sidebar', waitOn: null}
     });
     },
     */
    start: function () {
    },
    action: function () {
        if (this.ready()) {
            if (!Projects.findOne()) { // project does not exist
                window.location.replace('/');
            }

            var strs = (window.location.search.match(/([^\?=&]+=[^=&]+)/g) || []),
                sprint = Sprints.find({project: App.defaults.project, active: true});

            if (sprint) {
                App.defaults.sprintNumber = sprint.sprintNumber;
            }

            if (Meteor.user) {
                App.defaults.member = Meteor.user();
            }

            strs.forEach(function (pair) {
                var re, colors, result, splitted = pair.split(/=/);

                if (splitted[0] === 'colors') {
                    App.defaults.colors = [];

                    colors = splitted[1].split(/,/);
                    colors.forEach(function (color) {
                        re = new RegExp(color);
                        result = TaskColors.findOne({$or: [
                            {title: re},
                            {value: re}
                        ] });
                        if (result) {
                            App.defaults.colors.push(result.value);
                        }
                    });
                }
                else if (splitted[0] === 'member') {
                    re = RegExp(splitted[1]);
                    result = Members.findOne({$or: [
                        {name: re},
                        {initials: re}
                    ]});

                    if (result) {
                        App.defaults.member = result._id;
                    }
                }
            });
            this.render('scrumboard');
        }
        else {
            ;//this.render('loading');
        }
    }
});
