StatsController = RouteController.extend({
    onBeforeAction: function () {
        App.page = 'statistics';
        App.scrumboard.view = 'small';
        App.scrumboard.readonly = true;
    },
    data: { pageCls: 'page-statistics'},
    waitOn: function () {
        var project = this.params.project;
        App.defaults = {project: project};

        if (App.subs) {
            for (var name in App.subs) {
                App.subs[name].stop();
            }
        }

        App.subs = {
            projects: Meteor.subscribe('projects', project),
            sprint: Meteor.subscribe('sprint', project),
            lanes: Meteor.subscribe('lanes'),
            taskColors: Meteor.subscribe('task-colors'),
            members: Meteor.subscribe('members', project),
            lanesSetup: Meteor.subscribe('lanes-setup', project),
            taskColorsSetup: Meteor.subscribe('task-colors-setup', project),
            tasks: Meteor.subscribe('tasks', project),
            taskPositions: Meteor.subscribe('task-positions', project)

            //velocity: Meteor.subscribe('velocity', project),
            //burnup: Meteor.subscribe('burnup', project, sprint.sprintNumber),
            //burndown: Meteor.subscribe('burndown', project, sprint.sprintNumber),
        };
        return [];//App.subs.velocity, App.subs.burndown, App.subs.burnup];
    },
    start: function () {
    },
    action: function () {
        if (this.ready()) {
            this.render('statsOverview');
            this.render('header', {to: 'header-section'});
        }
    }
});
