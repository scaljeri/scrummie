Template.scrumboardHeader.addTaskState = function () {
    return isDocumentEditable() ? '' : 'manip-task--hidden';
};

Template.scrumboardHeader.sprintNumber = function () {
    var sprint = Sprints.findOne(query({active: true}));
    return sprint ? sprint.sprintNumber : '???';
};

Template.scrumboardHeader.events = {
  'click [add-task]': function () {
    var addTask = $('[add-task]'),
        sprint = Sprints.findOne(query({active: true}));

    if (!sprint) {
        Session.set('alert', {message: 'No active sprint', help: { label: 'Let\'s fix it', preset: 'configSprint'}});
    }
    else if (!addTask.hasClass('btn--active')) {
      addTask.addClass('btn--active');
      $('[manip-task]').position({
        of: $('[add-task]'),
        my: 'center bottom',
        at: 'center top',
        collision: 'fit flip'
      });

      Template.manipTask.show();
      //event.stopPropagation();
    }
  },
  'click [project-setup]': function () {
    if (App.page === 'scrumboard') {
        Template.projectConfig.show();
    }
  }
};
