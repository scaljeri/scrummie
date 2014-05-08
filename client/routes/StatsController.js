StatsController = RouteController.extend({
    onBeforeAction: function () {
      App.scrumboard.view = 'small';
      App.scrumboard.readonly = true;
    },
    waitOn: function () {
        return [];//App.subs.velocity, App.subs.burndown, App.subs.burnup];
    },
    start: function () {},
    action: function () {
        if (this.ready()) {
            this.render('statsOverview');
        }
    }
});
