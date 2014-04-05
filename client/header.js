Template.header.sprint = function () {
    return Sprints.findOne({ startdate: {$gt: new Date().getTime()}, enddate: { $lt: new Date().getTime()}});
}

Template.header.events = {
    'click [add-task]': function () {
        var addTask = $('[add-task]');
        App.selectedTask = null;

        $("[positionable]").position({
            of: $("[add-task]"),
            my: 'center bottom',
            at: 'center top',
            collision: 'fit flip'
        });

        addTask.toggleClass('active');
        Template.editTask.multiColorMode();

        if (addTask.hasClass('active')) {
            $('[edit-task]').css('visibility', 'visible');
        }
        else {
            $('[edit-task]').css('visibility', 'hidden');
        }

        event.stopPropagation();
    },
    'click [config]': function (event) {
        $('[config-menu]').addClass('visible');
        event.stopPropagation();

        Template.configMenu.setup();
    }
}
