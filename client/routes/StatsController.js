StatsController = RouteController.extend({
    onBeforeAction: function () {
      App.page = 'statistics';
      App.scrumboard.view = 'small';
      App.scrumboard.readonly = true;
    },
    data: { pageCls: 'page-statistics'},
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
