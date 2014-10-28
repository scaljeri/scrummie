Template.projectConfig.created = function () {
    App.eventHub.on('project.show', show);
};

Template.projectConfig.helpers({
    members: function () {
        return Members.find(query(), {sort: {name: 1}});
    }
});

Template.projectConfig.events = {
    'click *': function (event) { // make sure the popover is not closed
        event.stopPropagation();
    },
    'click .accordion .title': function (e, t) {
        var target = $(e.target).closest('[accordion-item]'),
                item = target.attr('accordion-item'),
                active;

        App.eventHub.trigger('project.closeItem');
        active = $(t.find('.accordion__item--open'))
                .removeClass('accordion__item--open')
                .addClass('accordion__item--closed');

        if (active[0] !== target[0]) {
            if (item) {
                App.eventHub.trigger('project.' + item + '.show');
            }

            target.removeClass('accordion__item--closed')
                    .addClass('accordion__item--open');
        }
    }
};

function show() {
    var config = $('[config-menu]');

    config.css('display', 'block');
    setTimeout(function () {
        config.addClass('visible');
    }, 0);

    App.eventHub.trigger('project.initialize');
    App.outsideClick.register('.config-content', hide);
}

function hide(e) {
    App.eventHub.trigger('project.closing');
    App.outsideClick.remove(hide);

    $('[config-menu]').removeClass('visible');
    $('[accordion-item]')
            .addClass('accordion__item--closed')
            .removeClass('accordion__item--open');
}

Tracker.autorun(function () {
    if (window.Sprints !== undefined) {
        var sprint = Sprints.findOne(query(), {sort: {sprintNumber: -1}});

        if (sprint && sprint.startdate) {
            $('[start-date]').datepicker("setDate", new Date(sprint.startdate));
        }
        if (sprint && sprint.enddate) {
            $('[end-date]').datepicker("setDate", new Date(sprint.enddate));
        }
    }
});
