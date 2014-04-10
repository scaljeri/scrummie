Template.postits.items = function () {
    return Tasks.find({}, { sort: {index: 1}}).fetch();
};

Template.postits.rendered = function (t) {
    $('[droppable]').droppable({
        accept: "[draggable]",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function (event, ui) {
            var taskId = ui.draggable.attr('data-id'),
                laneId = $(event.target).attr('data-id'),
                left = parseInt(ui.draggable.css('left')),
                top = parseInt(ui.draggable.css('top')),
                width = $('[scrumboard]').width();
            height = $('[scrumboard]').height();

            Meteor.call('updatePostitPosition', {
                _id: taskId,
                laneId: laneId,
                x: (1 - (width - left) / width) * 100,
                y: (1 - (height - top) / height) * 100
            });
        }
    });
};

Template.postits.events = {
    'mousedown [postit]': function (e, t) {
        //$(e.target).closest('[postit]').css('z-index', 1000000);
    },
    'drag [postit]' : function (e, t) {
        $(e.target).closest('[postit]').css('z-index', 1000000);
    },
    'dragend [postit]' : function (e, t) {
        var el = $(e.target).closest('[postit]');
        el.css('z-index', el.attr('zIndex', 'data-z-index'));

    }
};

/*
 db.tasks.find(
 { "color": { $in: ["e4oqPeoBTJtCpG53K", "cvmQv7vQHunPnmqPz"] }}
 );
 */
