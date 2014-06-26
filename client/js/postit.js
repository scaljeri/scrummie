var postit;

Template.postit.zIndex = function () {
    if (this.updated) {
        //1396695841955 --> "95841"
        return this.updated.toString().replace(/^\d{4}|\d{3}$/g, '');
    }
};

Template.postit.isVisible = function () {
    return !!App.colorFilter || this.color in App.colorFilter;
};

Template.postit.color = function () {
    return TaskColorsSetup.findOne({_id: this.colorId});
};

Template.postit.member = function () {
    return Meteor.users.findOne({_id: this.memberId});
};

Template.postit.projectName = function () {
    return App.defaults.project;
};

Template.postit.state = function () {
    if (postit) {
        postit.draggable("option", "disabled", !isDocumentEditable(this));
    }

    return 'postit--' + (isDocumentEditable(this) ? 'draggable' : 'fixed');
};

Template.postit.rendered = function () {
    postit = $(this.find('[postit]'));

    // if readonly a postit is not allowed to move outside its lane
    postit.draggable({
        containment: '.' + (App.scrumboard.readonly ? this.data.laneId : 'lanes'),
        scroll: false,
        disabled: !isDocumentEditable(this.data),
        zIndex: 1000000
    });
    return Tasks.find({}, { sort: {index: 1}}).fetch();
};

Template.postit.events = {
    'click [postit]': function (e, t) {
        if (!e.target.hasAttribute('postit-link') && isDocumentEditable(t.data)) {
            var postit = $(e.target).closest('[postit]');

            $('[manip-task]').position({
                of: postit,
                my: 'center center',
                at: 'center center',
                collision: 'fit fit'
            });
            Template.manipTask.show(Tasks.findOne({_id: postit.attr('data-id')}));
        }
    }
};
