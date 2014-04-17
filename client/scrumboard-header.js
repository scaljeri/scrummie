Template.scrumboardHeader.events = {
  'click [add-task]': function () {
    var addTask = $('[add-task]');

    if (!addTask.hasClass('active')) {
      addTask.addClass('active');
      $('[manip-task]').position({
        of: $('[add-task]'),
        my: 'center bottom',
        at: 'center top',
        collision: 'fit flip'
      });

      Template.manipTask.show();
      //event.stopPropagation();
    }
  }
};