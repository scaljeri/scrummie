Template.postits.items = function () {
 return Tasks.find({}, { sort: {index: 1}}).fetch();
};

Template.postits.rendered = function (t) {
    var postits = $('[postit]');

    if (postits.length > 0) {
        postits.draggable({
            containment: '[scrumboard]'
        });
        $('[droppable]').droppable({
            accept: "[draggable]",
            activeClass: "ui-state-hover",
            hoverClass: "ui-state-active",
            drop: function( event, ui ) {
                var _id = ui.draggable.attr('data-id'),
                    left = parseInt(ui.draggable.css('left')),
                    top = parseInt(ui.draggable.css('top')),
                    width = $('[scrumboard]').width();
                    height = $('[scrumboard]').height();

                Meteor.call('updatePostitPosition', {
                    _id: _id,
                    x: (1-(width-left)/width) * 100,
                    y: (1-(height-top)/height) * 100
                });
            }
        });
    }
}

Template.postits.events = {
    'mousedown [postit]' : function (e, t) {
        $(e.target).closest('[postit]').css('z-index', 10);
    }
}
