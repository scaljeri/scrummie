var closeCallback;

Template.manipTask.task = function () {
  return App.selectedTask;
};

Template.manipTask.colors = function () {
  return TaskColors.find({}, {sort: {index: 1}}).fetch();
};

Template.manipTask.members = function () {
  return Members.find({}, {sort: {name: 1}});
};

Template.manipTask.show = function (task, callback) {
  if (task && typeof task === 'function') {
    callback = task;
    task = null;
  }

  App.selectedTask = task;
  closeCallback = callback||App.noob;

  setTimeout(function () { // make sure App.selectedTask is applied
    var select = $('[manip-task] [dropdown][colors]'),
      taskColors = [];

    if (task) {
      select.removeAttr('multiple');
      taskColors = TaskColors.findOne({_id: task.colorId}).value;
    }
    else {
      select.attr('multiple', 'multiple')
    }

    select.select2({
      allowClear: true,
      formatResult: format,
      formatSelection: format,
      maximumSelectionSize: 5,
      minimumResultsForSearch: -1,
      placeholder: "Colors"
    });
    select.select2('val', taskColors);

    $('[manip-task]').css('visibility', 'visible');

  }, 0);
  App.outsideClick.register('[manip-task]', Template.manipTask.hide);
};

Template.manipTask.hide = function () {
  $('[manip-task] [dropdown]').blur();
  $('[manip-task]').css('visibility', 'hidden');

  App.outsideClick.remove(Template.manipTask.hide);
};

Template.manipTask.rendered = function () {
  $('[manip-task] [dropdown][members]').select2({
    //formatResult: format,
    //formatSelection: format,
    //maximumSelectionSize: 5,
    minimumResultsForSearch: -1,
    placeholder: "Team member"
  });
};

Template.manipTask.events = {
  /*'click [edit-task]': function (event) { // make sure the popover is not closed
   event.stopPropagation();
   },*/
  'click [cancel-task]': function () {
    $('[manip-task]').css('visibility', 'hidden');
    $('[add-task]').removeClass('active');
    window.scrummie.edit.createNew();
  },
  'click [save-task]': function (e) {
    Meteor.call('upsertTask', $('[manip-task]').serializeObject(), function (err, response) {
      if (response.status === 'error') {
        App.errorMessage = response.msg;
        $('[error-dialog]').dialog('open');
      }
    });

    $('[manip-task]').css('visibility', 'hidden');
    $('[add-task]').removeClass('active');  // TODO: implement closeCallback
    $('[manip-task]')[0].reset();
  }
};

function format(color) {
  return ['<span class="select-option-color"',
      'style="background-color:' + color.id + '"></span>',
      '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
}

