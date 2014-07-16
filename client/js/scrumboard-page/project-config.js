Template.projectConfig.items = {};

Template.projectConfig.members = function () {
    return Members.find(query(), {sort: {name: 1}});
};

Template.projectConfig.show = function () {
    $('[config-menu]').addClass('visible');

    Template.configSprint.initialize();

    App.outsideClick.register('.config-content', Template.projectConfig.hide);
};

Template.projectConfig.hide = function (e) {
    if ($(e.target).closest('.ui-datepicker-header').length === 0) { // make sure the config window doesn't close on calendar navigation
        $('[config-menu]').removeClass('visible');
        App.outsideClick.remove(Template.projectConfig.hide);

        if (accordion) {
            accordion.addClass('accordion__item--open')
                .removeClass('accordion__item--closed');
            accordion = null;
        }

    }

    $('[accordion-item]').addClass('accordion__item--closed')
        .removeClass('accordion__item--open');
};


var accordion = null;
Template.projectConfig.events = {
    'click *': function (event) { // make sure the popover is not closed
        event.stopPropagation();
    },
    'click .accordion .title': function (e, t) {
        var target;

        if (accordion) { // close
            accordion.addClass('accordion__item--closed')
                .removeClass('accordion__item--open');
            var attr = accordion.attr('accordion-item');
            if (attr) {
                Template.projectConfig.items[attr].closing();
            }
        }

        target = $(e.target).closest('[accordion-item]');
        if (!accordion || target[0].className !== accordion[0].className) { // open
            accordion = target;
            accordion.addClass('accordion__item--open')
                .removeClass('accordion__item--closed');
        }
        else {
            accordion = null;
        }
    }
};

Deps.autorun(function () {
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
