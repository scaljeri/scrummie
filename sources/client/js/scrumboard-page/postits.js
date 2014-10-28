Template.postits.helpers({
    items: function () {
        return Tasks.find(query(), {sort: {index: 1}});
    }
});

Template.postits.rendered = function (t) {
    $('[droppable]').droppable({
        accept: "[draggable]",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function (event, ui) {
            var taskId = ui.draggable.attr('data-id'),
                    laneId = $(event.target).attr('data-id'), // lane in which the post-it was dropped
                    left = parseInt(ui.draggable.css('left')),
                    top = parseInt(ui.draggable.css('top')),
                    task = Tasks.findOne({_id: taskId}),
                    firstLaneId = LanesSetup.findOne({index: 0})._id;

            width = $('[scrumboard]').width();
            height = $('[scrumboard]').height();

            if (App.defaults.member && task.memberId === "" && laneId !== firstLaneId) {
                task.memberId = App.defaults.member._id;
            }

            Meteor.call('updatePostitPosition', {
                _id: taskId,
                laneId: laneId,
                //memberId: task.memberId,    // optimise this, because its not always needed
                x: (1 - (width - left) / width) * 100,
                y: (1 - (height - top) / height) * 100
            });
        }
    });
};

/*
 db.tasks.find(
 { "color": { $in: ["e4oqPeoBTJtCpG53K", "cvmQv7vQHunPnmqPz"] }}
 );
 */
