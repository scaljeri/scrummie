StatsController = RouteController.extend({
    onBeforeAction: function () {
        App.page = 'statistics';
        App.scrumboard.view = 'small';
        App.scrumboard.readonly = true;

        sprint = Sprints.findOne({active: true});
        if (sprint) { // initialize subscriptions which depend on the sprint number
            if (App.subs.tasks) {
                App.subs.tasks.stop();
                App.subs.taskPositions.stop();
            }
            App.subs.tasks = Meteor.subscribe('tasks', sprint.sprintNumber);
            App.subs.taskPositions = Meteor.subscribe('task-positions', sprint.sprintNumber);
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
