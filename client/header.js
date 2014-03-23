Template.header.sprint = function () {
    return Sprints.findOne({ startDate: {$gt: new Date().getTime()}, endDate: { $lt: new Date().getTime()}});
}

Template.header.events = {
    'click [add-task]': function () {
        window.scrummie.edit.createNew();
        var addTask = $('[add-task]');

        $("[positionable]").position({
            of: $("[add-task]"),
            my: 'center bottom',
            at: 'center top',
            collision: 'fit flip'
        });

        addTask.toggleClass('active');

        if (addTask.hasClass('active')) {
            $('[edit-task]').css('visibility', 'visible');
        }
        else {
            $('[edit-task]').css('visibility', 'hidden');
        }

        event.stopPropagation();
    }
}

Template.editTask.events = {
    'click .edit-task': function (event) { // make sure the popover is not closed
        event.stopPropagation();
    }
}

Template.editTask.colors = function () {
    return Colors.find({}, {sort: {index: 1}}).fetch();
}
