Template.postit.helpers({
    zIndex: function () {
        var hidden = applyFilter(this, Session.get('postitFilter')||{});

        if (this.updated) {
            return hidden ? 200 : parseInt(this.updated/1000);
        }
    },
    isVisible: function () {
        return !!App.colorFilter || this.color in App.colorFilter;
    },
    color: function () {
        return TaskColorsSetup.findOne({_id: this.colorId});
    },
    member: function () {
        if (App.settings.authenticate) {
            return Meteor.users.findOne({_id: this.memberId});
        }
        else {
            return Members.findOne({_id: this.memberId});
        }
    }
});

Template.postit.projectName = function () {
    return App.defaults.project;
};

Template.postit.state = function () {
    var state,
        filter = Session.get('postitFilter'),
        hide = applyFilter(this, filter||{});
    state = 'postit--' + (isDocumentEditable(this) && !hide ? 'draggable' : 'fixed');

    if (hide) {
        state += ' postit--soft-hide';
    }

    return state;
};

Template.postit.rendered = function () {
    var postit = $(this.find('[postit]'));

    postit.draggable({
        containment: '.' + (App.scrumboard.readonly ? this.data.laneId : 'lanes'),
        scroll: false,
        disabled: !isDocumentEditable(this.data),
        zIndex: 9000000000,
        stop: function () {
            $(this).css('z-index', 8999999999); // this value is only valid until new data comes from the server
        }
    });

    if (postit) {
        this.watchPostit = Deps.autorun(function () {
            var filter = Session.get('postitFilter'),
                hide = applyFilter(this.data, filter||{});

            postit.draggable("option", "disabled", !isDocumentEditable(this.data) || hide);

            if (hide) {
                var zIndex = Math.max(Template.postit.zIndex.call(this.data) - 200000, 2);
                postit.css('z-index', zIndex);
            }
            else if (filter && filter.text) {
                postit.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
                    postit.removeClass('postit--notify');
                });
                postit.addClass('postit--notify');
            }
        }.bind(this));
    }
};

Template.postit.destroyed = function () {
    this.watchPostit.stop();
};

Template.postit.events = {
    'click [postit]': function (e, t) {
        var hide = applyFilter(this.data, Session.get('postitFilter')||{});

        if (!e.target.hasAttribute('postit-link') && isDocumentEditable(t.data) && !hide) {
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

function applyFilter(task, filter) {
    var re = filter.text ? new RegExp('.*' + filter.text + '.*', 'i') : null,
        retVal = false;

    if (filter.colorId && task.colorId !== filter.colorId) {
        retVal = true;
    }

    if (re && !(task.title||'').match(re) && !(task.description||'').match(re)) {
        retVal = true;
    }

    return retVal;
}
