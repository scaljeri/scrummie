var closeCallback;

Template.manipTask.task = function () {
    return App.selectedTask;
};

Template.manipTask.colors = function () {
    return TaskColorsSetup.find(query(), {sort: {index: 1}}).fetch();
};

Template.manipTask.issues = function () {

    return Session.get('serverDataResponse') || "";
};

Template.manipTask.members = function () {
    var settings = Settings.findOne();

    if (App.defaults.projectId) {
        if (settings && settings.isAuth) {
            return Meteor.users.find({projects: {$in: [App.defaults.projectId]}}, {sort: {name: 1}}).fetch();
        }
        else {
            console.log(Members.find(query()).fetch());
            return Members.find(query()).fetch();
        }
    }
};

Template.manipTask.show = function (task, callback) {

    Meteor.call('jiraStories', '30', 'test', function (error,result) {
        if(error) {
            Session.set('serverDataResponse', "Error:" + err.reason);
            return;
        }
        Session.set('serverDataResponse', result.issues);
        console.log(result.issues);
    });
    var taskColors = [], members, select, issues;

    if (task && typeof task === 'function') {
        callback = task;
        task = null;
    }


    App.selectedTask = task;
    closeCallback = callback || App.noob;

    setTimeout(function () { // make sure App.selectedTask is applied

        select = $('[manip-task] [dropdown][colors]');
        issues = $('[manip-task] [dropdown][issues]');
        members = $('[manip-task] [dropdown][members]');

        if (task) {
            select.removeAttr('multiple');
            if (task.colorId) {
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

        $('[manip-task]').addClass('on-top');

        members.select2({
            allowClear: true,
            minimumResultsForSearch: -1,
            placeholder: "Team member"
        });

        issues.select2({
            allowClear: true,
            minimumResultsForSearch: -1,
            formatResult: format,
            placeholder: "Select Jira task",
            allowNewValues: true
         });

        issues.on('change', function () {
            if (issues.val() === '') {
                console.log('nothing');
            }
            else {

                $('[manip-task] [description]').value = issues.val();
            }
        })

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
    $('[manip-task]').removeClass('on-top')
        .find('.error').removeClass('error big-error');
    $('[add-task]').removeClass('btn--active');  // TODO: implement closeCallback

    App.outsideClick.remove(Template.manipTask.hide);
};

Template.manipTask.rendered = function () {


};

Template.manipTask.events = {

    'click [cancel-task]': closeManip,
    'click [save-task]': function (e, tpl) {
        var data = $('[manip-task]').serializeObject({sprintNumber: App.defaults.sprintNumber}),
            errors = false;

        $(tpl.findAll('.error')).removeClass('error big-error');

        if (!data.title) {
            $('[manip-task-title]').addClass('animated rubberBand')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('animated rubberBand')
                        .addClass(($(this).hasClass('error') ? 'big-' : '') + 'error');
                });
            errors = true;
        }
        if (!data.color) {
            $(tpl.find('.select2-colors .select2-choices')).addClass('animated rubberBand')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('animated rubberBand')
                        .addClass(($(this).hasClass('error') ? 'big-' : '') + 'error');
                });
            errors = true;
        }

        if (!errors) {
            Meteor.call('upsertTask', App.defaults.project, data, function (err, response) {
                if (response.status === 'error') {
                    App.errorMessage = response.msg;
                    $('[error-dialog]').dialog('open');
                }
            });

            closeManip();
        }

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
    $('[manip-task]').removeClass('on-top')[0].reset();
    $('[add-task]').removeClass('btn--active');
    //$('[manip-task]')[0].reset();
    App.selectedTask = null;
}

function format(color) {
    return ['<span class="select-option-color"',
            'style="background-color:' + color.id + '"></span>',
            '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
}
