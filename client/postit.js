Template.postit.zIndex = function () {
    if (this.updated) {
        //1396695841955 --> "95841"
        return this.updated.toString().replace(/^\d{4}|\d{3}$/g, '');
    }
};

Template.postit.getColor = function () {
    var colors = TaskColors.find({}).fetch(),
        self = this,
        color = _.find(colors, function(color) {
            return color._id === self.color;
        });
    return color ? color.color : '#fff';
};

Template.postit.rendered = function () {
    var postit = $(this.find('[postit]'));
    $(postit).draggable({
        containment: '[scrumboard]'
    });
};

Template.postit.events = {
    'click [postit]' : function (e) {
        var postit = $(e.target).closest('[postit]');

        $('[edit-task]').position({
            of: postit,
            my: 'center center',
            at: 'center center',
            collision: 'fit fit'
        });
        setTimeout(function () {
            $('[edit-task]').css('visibility', 'visible');
        },0);

        Template.editTask.singleColorMode(Tasks.findOne({_id: postit.attr('data-id')}));
    }
}
