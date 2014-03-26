Template.editTask.task = function() {
    window.scrummie.edit.dep.depend();
    return window.scrummie.edit.task;
}

Template.editTask.taskColors = function() {
    return TaskColors.find({}, {
        sort: {
            index: 1
        }
    }).fetch();
}

Template.editTask.rendered = function() {
    function format(color) {
        return ['<span class="select-option-color"',
            'style="background-color:' + color.id + '"></span>',
            '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
    }
    $('[edit-task] [dropdown]').select2({
        formatResult: format,
        formatSelection: format,
        maximumSelectionSize: 5,
        minimumResultsForSearch: -1,
        placeholder: "Colors"
    });
};

Template.editTask.events = {
    'click [edit-task-form]': function(event) { // make sure the popover is not closed
        event.stopPropagation();
    },
    'click [cancel-task]': function() {
        $('[edit-task]').css('visibility', 'hidden');
        $('[add-task]').removeClass('active');
        window.scrummie.edit.createNew();
    },
    'click [save-task]': function() {
        Meteor.call('upsertTask', $('[edit-task-form]').serializeObject());
        $('[edit-task]').css('visibility', 'hidden');
        $('[add-task]').removeClass('active');
        $('[edit-task-form]')[0].reset();
    }
};
