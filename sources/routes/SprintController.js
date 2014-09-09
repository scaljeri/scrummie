SprintController = RouteController.extend({
    //fastRender: true,
    layoutTemplate: 'layout',

    onBeforeAction: function () {
        // TODO: use Session
        App.page = 'scrumboard';
        App.scrumboard.view = 'normal';
        App.scrumboard.readonly = false;
    },
    waitOn: function () {
        var project = this.params.project;
        App.defaults = {project: project}; // reset App.defaults

        if (Meteor.isClient) {
            Session.set('alert', null);
            Session.set('postitFilter', null);
            Session.set('project', project); // TODO
        }

        if (App.subs.settings && App.subs.settings.stop) {
            App.subs.settings.stop();
        }

        App.subs.settings = Meteor.subscribe('settings', project);

        return [
            subs.subscribe('settings', project),
            subs.subscribe('projects', project),
            subs.subscribe('sprint', project),
            subs.subscribe('lanes'),
            subs.subscribe('no-auth-members', project),
            subs.subscribe('lanes-setup', project),
            subs.subscribe('task-colors-setup', project),
            subs.subscribe('task-positions', project),
            subs.subscribe('tasks', project),
            subs.subscribe('users')
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
            // TODO: cleanup
            if (!Projects.findOne()) { // project does not exist
                window.location.replace('/');
            }

            var strs = (window.location.search.match(/([^\?=&]+=[^=&]+)/g) || []);

            var sprint = Sprints.findOne(query({active: true}));
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
                        // TODO: Does this query work
                        result = TaskColors.findOne(query({$or: [
                            {title: re},
                            {value: re}
                        ] }));
                        if (result) {
                            App.defaults.colors.push(result.value);
                        }
                    });
                }
                else if (splitted[0] === 'member') {
                    re = RegExp(splitted[1]);
                    result = Members.findOne(query({$or: [
                        {name: re},
                        {initials: re}
                    ]}));

                    if (result) {
                        App.defaults.member = result._id;
                    }
                }
            });
            this.render('scrumboard');
            this.render('header', { to: 'header-section'});
        }
        else {
            this.render('loading');
        }
    }
});
