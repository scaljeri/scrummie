var closeCallback;

Template.manipTask.task = function () {
    return App.selectedTask;
};

Template.manipTask.colors = function () {
    return TaskColorsSetup.find({}, {sort: {index: 1}}).fetch();
};

Template.manipTask.members = function () {
    var project = Projects.findOne(),
        settings = Settings.findOne();

    if (project) {
        if (settings && settings.isAuth) {
            return Meteor.users.find({projects: {$in: [project._id]}}, {sort: {name: 1}}).fetch();
        }
        else {
            return Members.find().fetch();
        }
    }
};

Template.manipTask.show = function (task, callback) {
    var taskColors = [], memberId, members, select;

    if (task && typeof task === 'function') {
        callback = task;
        task = null;
    }

    App.selectedTask = task;
    closeCallback = callback || App.noob;

    setTimeout(function () { // make sure App.selectedTask is applied
        select = $('[manip-task] [dropdown][colors]');
        members = $('[manip-task] [dropdown][members]');

        if (task) {
            select.removeAttr('multiple');
            if (task.colorId) { // TODO: can happen now, but should not happen
                taskColors = TaskColorsSetup.findOne({_id: task.colorId});
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
            placeholder: "Colors",
            containerCssClass: 'select2-colors'
        });

        select.select2('val', taskColors ? taskColors.value : null);

        $('[manip-task]').css('visibility', 'visible');

        members.select2({
            minimumResultsForSearch: -1,
            placeholder: "Team member"
        });

        if (task && task.memberId) {
            members.select2('val', task.memberId);
        }

        $('[manip-task] [dropdown]').on('select2-close', function () {
            $('[manip-task] [dropdown]').not(this).select2('close');
        });

        $('[manip-task] [name="title"]').focus();

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
    'click [cancel-task]': closeManip,
    'click [save-task]': function (e) {
        var data = $('[manip-task]').serializeObject({sprintNumber: App.defaults.sprintNumber});
        if (!data.color) {
            data.color = App.defaults.colors;
        }

        Meteor.call('upsertTask', App.defaults.project, data, function (err, response) {
            if (response.status === 'error') {
                App.errorMessage = response.msg;
                $('[error-dialog]').dialog('open');
            }
        });

        closeManip();
    },
    'click [delete-task]': function () {
        Meteor.call('deleteTask', App.selectedTask._id);
        closeManip();
    },
    'click [clone-task]': function () {
        var data = $('[manip-task]').serializeObject({sprintNumber: App.defaults.sprintNumber});
        Meteor.call('cloneTask', data);
        closeManip();
    }
};

function closeManip() {
    $('[manip-task]').css('visibility', 'hidden');
    $('[add-task]').removeClass('btn--active');
    $('[manip-task]')[0].reset();
    App.selectedTask = null;
}

function format(color) {
    return ['<span class="select-option-color"',
            'style="background-color:' + color.id + '"></span>',
            '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
}
