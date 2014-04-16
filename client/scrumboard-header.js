Template.scrumboardHeader.events = {
  'click [add-task]': function () {
    debugger;
    var addTask = $('[add-task]');
    addTask.toggleClass('active');
    App.selectedTask = null;

    if (addTask.hasClass('active')) {
      $("[positionable]").position({
        of: $("[add-task]"),
        my: 'center bottom',
        at: 'center top',
        collision: 'fit flip'
      });

      App.outsideClick.isDirty = true;
      Template.manipTask.show();
      event.stopPropagation();
    }
  }
};