Template.editTask.task = function () {
    return App.selectedTask;
};

Template.editTask.colors = function () {
    return TaskColors.find({}, {sort: {index: 1}}).fetch();
};

Template.editTask.members = function () {
    return Members.find({}, {sort: {name: 1}});
};

Template.editTask.show = function (task) {
    App.selectedTask = task;
    setTimeout(function () { // make sure App.selectedTask is applied
        var select = $('[edit-task] [dropdown][colors]'),
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

        $('[edit-task]').css('visibility', 'visible');

        App.outsideClick.register('[edit-task]', Template.editTask.hide);
    }, 0);
};

Template.editTask.hide = function () {
    $('[edit-task] [dropdown]').blur();
    $('[edit-task]').css('visibility', 'hidden');

    App.outsideClick.remove(Template.editTask.hide);
};



Template.editTask.rendered = function () {
    $('[edit-task] [dropdown][members]').select2({
        //formatResult: format,
        //formatSelection: format,
        //maximumSelectionSize: 5,
        minimumResultsForSearch: -1,
        placeholder: "Team member"
    });
};

Template.editTask.events = {
    'click [edit-task-form]': function (event) { // make sure the popover is not closed
        event.stopPropagation();
    },
    'click [cancel-task]': function () {
        $('[edit-task]').css('visibility', 'hidden');
        $('[add-task]').removeClass('active');
        window.scrummie.edit.createNew();
    },
    'click [save-task]': function (e) {
        Meteor.call('upsertTask', $('[edit-task-form]').serializeObject(), function (err, response) {
            if (response.status === 'error') {
                App.errorMessage = response.msg;
                $('[error-dialog]').dialog('open');
            }
        });

        $('[edit-task]').css('visibility', 'hidden');
        $('[add-task]').removeClass('active');
        $('[edit-task-form]')[0].reset();
    }
};

function format(color) {
    return ['<span class="select-option-color"',
            'style="background-color:' + color.id + '"></span>',
            '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
}

