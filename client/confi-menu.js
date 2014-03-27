Template.configMenu.rendered = function () {
    $( '[datepicker]' ).datepicker();
};

Template.configMenu.events = {
    'click [config-menu]': function(event) { // make sure the popover is not closed
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
