TaskController = RouteController.extend({
    onBeforeAction: function () {
        var taskId = this.params.id;
        App.subs.comments = Meteor.subscribe('comments', taskId);
    },
    waitOn: function () {
        return [App.subs.comments];
    },
    start: function () {},
    action: function () {
        if (this.ready()) {
            this.render('taskOverview');
        }
    }
});
