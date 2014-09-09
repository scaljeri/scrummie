TaskController = RouteController.extend({
  layout: 'layoutTask',

  onBeforeAction: function () {
    App.page = 'task';
  },
  waitOn: function () {
    var projectName  = App.defaults.project = this.params.project,
        taskId    = this.params.id;

    return [
      subs.subscribe('settings', projectName),
      subs.subscribe('projects', projectName),
      subs.subscribe('task', projectName, taskId),
      subs.subscribe('members', projectName, taskId),
      subs.subscribe('comments', taskId),
      subs.subscribe('lanes-setup', projectName),
      subs.subscribe('task-colors-setup', projectName),
      subs.subscribe('user')
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
