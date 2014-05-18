StatsController = RouteController.extend({
    onBeforeAction: function () {
        App.page = 'statistics';
        App.scrumboard.view = 'small';
        App.scrumboard.readonly = true;

        sprint = Sprints.findOne({active: true});
        if (sprint) {
            for (sub in App.subs) {
                sub.stop();
            }

            App.subs = {
                lanes: Meteor.subscribe('lanes'),
                taskColors: Meteor.subscribe('task-colors'),
                members: Meteor.subscribe('members', project),
                velocity: Meteor.subscribe('velocity', project),
                lanesSetup: Meteor.subscribe('lanes-setup', project),
                tasks: Meteor.subscribe('tasks', project, sprint.sprintNumber),
                taskColorsSetup: Meteor.subscribe('task-colors-setup', project),
                burnup: Meteor.subscribe('burnup', project, sprint.sprintNumber),
                sprint: Meteor.subscribe('sprint', project, sprint.sprintNumber),
                burndown: Meteor.subscribe('burndown', project, sprint.sprintNumber),
                taskPositions: Meteor.subscribe('task-positions', project, sprint.sprintNumber)
            };
        }
    },
    data: { pageCls: 'page-statistics'},
    waitOn: function () {
        return [];//App.subs.velocity, App.subs.burndown, App.subs.burnup];
    },
    start: function () {
    },
    action: function () {
        if (this.ready()) {
            this.render('statsOverview');
        }
    }
});
