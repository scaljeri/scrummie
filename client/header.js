Template.header.sprint = function () {
    return Sprints.findOne({ startdate: {$gt: new Date().getTime()}, enddate: { $lt: new Date().getTime()}});
}

Template.header.rendered = function () {
    App.outsideClick.register('[edit-task]', function () {
        $('[add-task]').removeClass('active');
    });
}

Template.header.events = {
    'click [add-task]': function () {
        var addTask = $('[add-task]');
        addTask.toggleClass('active');
        App.selectedTask = null;

        if (addTask.hasClass('active')) {
            $("[positionable]").position({
                of: $("[add-task]"),
                my: 'center bottom',
                at: 'center top',
                collision: 'fit flip'
            });

            Template.editTask.show();
            event.stopPropagation();
        }
    },
    'click [config]': function (event) {
        App.outsideClick.isDirty = true;
        Template.configMenu.show();
    }
};
