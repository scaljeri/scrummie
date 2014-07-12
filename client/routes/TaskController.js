TaskController = RouteController.extend({
  layout: 'layoutTask',

  onBeforeAction: function () {
    App.page = 'task';
  },
  waitOn: function () {
    var projectName  = App.defaults.project = this.params.project,
        taskId    = this.params.id;

   if (App.subs) {
      for (name in App.subs) {
        App.subs[name].stop();
      }
    }

    App.subs = {
      settings: Meteor.subscribe('settings', projectName),
      projects: Meteor.subscribe('projects', projectName),
      task: Meteor.subscribe('task', projectName, taskId),
      members: Meteor.subscribe('members', projectName, taskId),
      comments: Meteor.subscribe('comments', taskId ),
      lanesSetup: Meteor.subscribe('lanes-setup', projectName),
      taskColorsSetup: Meteor.subscribe('task-colors-setup', projectName),
      users: Meteor.subscribe('users')
    };
    return [
      App.subs.settings,
      App.subs.projects,
      App.subs.task,
      App.subs.members,
      App.subs.comments,
      App.subs.lanesSetup,
      App.subs.taskColorsSetup,
      App.subs.users
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
