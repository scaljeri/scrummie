StatsController = RouteController.extend({
    onBeforeAction: function () {
      App.subs.velocity = Meteor.subscribe('velocity');
      App.subs.burndown = Meteor.subscribe('burndown');
      App.subs.burnup = Meteor.subscribe('burnup');

      App.scrumboard.view = 'small';
      App.scrumboard.readonly = true;
    },
    waitOn: function () {
        return [App.subs.velocity, App.subs.burndown, App.subs.burnup];
    },
    start: function () {},
    action: function () {
        if (this.ready()) {
            this.render('statsOverview');
        }
    }
});