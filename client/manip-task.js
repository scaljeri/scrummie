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
  var taskColors = [], memberId, members, select;

  if (task && typeof task === 'function') {
    callback = task;
    task = null;
  }

  App.selectedTask = task;
  closeCallback = callback||App.noob;

  setTimeout(function () { // make sure App.selectedTask is applied
    select = $('[manip-task] [dropdown][colors]');
    members = $('[manip-task] [dropdown][members]');

    if (task) {
      select.removeAttr('multiple');
      if (task.colorId) { // TODO: can happen now, but should not happen
        taskColors = TaskColors.findOne({_id: task.colorId}).value;
      }
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

    members.select2({
      minimumResultsForSearch: -1,
      placeholder: "Team member"
    });

    if (task && task.memberId) {
      memberId = Members.findOne({_id: task.memberId})._id;
    }
    members.select2('val', memberId);

  }, 0);
  App.outsideClick.register('[manip-task]', Template.manipTask.hide);
};

Template.manipTask.hide = function () {
  $('[manip-task] [dropdown]').blur();
  $('[manip-task]').css('visibility', 'hidden');
  $('[add-task]').removeClass('btn--active');  // TODO: implement closeCallback

  App.outsideClick.remove(Template.manipTask.hide);
};

Template.manipTask.rendered = function () {

};

Template.manipTask.events = {
  /*'click [edit-task]': function (event) { // make sure the popover is not closed
   event.stopPropagation();
   },*/
  'click [cancel-task]': function () {
    $('[manip-task]').css('visibility', 'hidden');
    $('[add-task]').removeClass('active');
    App.selectedTask = null;
  },
  'click [save-task]': function (e) {
    var data = $('[manip-task]').serializeObject();
    if (!data.color) {
        data.color = App.defaults.colors;
    }

    Meteor.call('upsertTask', data, function (err, response) {
      if (response.status === 'error') {
        App.errorMessage = response.msg;
        $('[error-dialog]').dialog('open');
      }
    });

    $('[manip-task]').css('visibility', 'hidden');
    $('[add-task]').removeClass('btn--active');  // TODO: implement closeCallback
    $('[manip-task]')[0].reset();
    App.selectedTask = null;
  },
  'click [delete-task]': function () {
    Meteor.call('deleteTask', App.selectedTask._id);
    $('[manip-task]').css('visibility', 'hidden');
    $('[add-task]').removeClass('btn--active');
    App.selectedTask = null;
  }
};

function format(color) {
  return ['<span class="select-option-color"',
      'style="background-color:' + color.id + '"></span>',
      '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
}
