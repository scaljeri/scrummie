Template.editTask.task = function () {
    return App.selectedTask;
};
Template.editTask.multiColorMode = function (task) {
    App.selectedTask = task;
    setTimeout(function () {
        setupSelect({multiple: true})
            .select2('val', []);
    }, 0);
};

Template.editTask.singleColorMode = function (task) {
    App.selectedTask = task;
    setTimeout(function () { // delay select2, so the change on App.selectedTask is applied first
        taskColor = TaskColors.findOne({_id: task.color});
        setupSelect( {multiple: false})
            .select2('val', taskColor.color);
    }, 0);
}

Template.editTask.taskColors = function () {
    return TaskColors.find({}, {
        sort: {
            index: 1
        }
    }).fetch();
};

Template.editTask.rendered = function () {
    $('[edit-task] [dropdown]').select2({
        formatResult: format,
        formatSelection: format,
        maximumSelectionSize: 5,
        minimumResultsForSearch: -1,
        placeholder: "Colors"
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

function setupSelect(options) {
    var select = $('[edit-task] [dropdown]');

    if (!options.multiple) {
        select.removeAttr('multiple')
    }
    else {
        select.attr('multiple', 'multiple')
    }

    return select.select2({
        formatResult: format,
        formatSelection: format,
        maximumSelectionSize: 5,
        minimumResultsForSearch: -1,
        placeholder: "Colors"
    });
}
