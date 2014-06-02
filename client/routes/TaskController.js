TaskController = RouteController.extend({
  layout: 'layout',

  onBeforeAction: function () {
    App.page = 'task';
  },
  waitOn: function () {
    var projectName  = App.defaults.project = this.params.project,
        taskTitle    = this.params.title;

    if (App.subs) {
      for (name in App.subs) {
        App.subs[name].stop();
      }
    }

    App.subs = {
      task: Meteor.subscribe('task', projectName, taskTitle),
      members: Meteor.subscribe('members', projectName, taskTitle),
      comments: Meteor.subscribe('comments', taskTitle ),
      lanesSetup: Meteor.subscribe('lanes-setup', projectName),
      taskColorsSetup: Meteor.subscribe('task-colors-setup', projectName)
    };
    return [
      App.subs.task,
      App.subs.members,
      App.subs.comments,
      App.subs.lanesSetup,
      App.subs.taskColorsSetup
    ];
  },
  start: function () {
  },
  action: function () {
    if (this.ready()) {
      this.render('taskOverview');
    }
    else
      ;
  }
});
