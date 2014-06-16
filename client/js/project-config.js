Template.projectConfig.items = {};

Template.projectConfig.members = function () {
    return Members.find({}, {sort: {name: 1}});
};

Template.projectConfig.rendered = function () {
    var sprint = Sprints.find({}, {sort: {sprintNumber: -1}});

    $('[start-date]').datepicker({
        currentText: 'Now',
        minDate: 0,
        onSelect: function (dateText) {
            var date = new Date(dateText);
            date.setDate(date.getDate() + 1);
            $('[end-date]').datepicker('option', 'minDate', date);
        }
    });
    $('[end-date]').datepicker({minDate: 0});
    $('[accordion]').accordion({heightStyle: 'fill'});
};

Template.projectConfig.show = function () {
    $('[config-menu]').addClass('visible');

    var sprint = Sprints.find({}, {sort: {sprintNumber: -1}});
    $('[start-date]').datepicker("setDate", new Date(sprint.startdate));
    $('[end-date]').datepicker("setDate", new Date(sprint.enddate));

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
    'click .accordion .title' : function (e, t) {
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
    },
    'click [stop-start-sprint]': function () {
        var sprintNumber = $('[sprint-number]').removeClass('error'),
            startdate = $('[start-date]'),
            enddate = $('[end-date]').removeClass('error'),
            sprint;


        var error = false;
        if (!sprintNumber.val()) {
            sprintNumber.addClass('error');
            error = true;
        }
        if (!startdate.val()) {
            endtime.addClass('error');
            error = true;
        }
        if (!enddate.val()) {
            endtime.addClass('error');
            error = true;
        }
        sprintNumber = parseInt(sprintNumber.val());
        sprint = Sprints.findOne({sprintNumber: sprintNumber}); // on the client we only have the data for a specific project

        if (!error) {
            // Change subscriptions sprint number
            App.subs.tasks.stop();
            App.subs.taskPositions.stop();
            App.subs.tasks = Meteor.subscribe('tasks', App.defaults.project, (sprint === undefined ? sprintNumber : -3));
            App.subs.taskPositions = Meteor.subscribe('task-positions', App.defaults.project, (sprint === undefined ? sprintNumber : -3));

            Meteor.call('upsertSprint', App.defaults.project, {
                sprintNumber: sprintNumber,
                startdate: startdate.val() === 'Now' ?
                    new Date() : new Date(startdate.val()),
                enddate: new Date(enddate.val()),
                active: sprint === undefined // if sprint is defined --> its closed now (active === false)
            }, function (result) {
              // TODO
            });
        }

        //$('[stop-start-sprint]').addClass('active');
        /*
         Meteor.call('upsertTask', $('[edit-task-form]').serializeObject());
         $('[edit-task]').css('visibility', 'hidden');
         $('[add-task]').removeClass('active');
         $('[edit-task-form]')[0].reset();
         */
    },
    'input [start-datepicker]': function () {
        debugger;
    },
    'click [add-member]': function () {
        var name = $('[add-member-name]').removeClass('error'),
            init = $('[add-member-initials]').removeClass('error');

        if (!name.val()) {
            name.addClass('error');
        }
        if (!init.val()) {
            init.addClass('error');
        }

        if (name.val() && init.val()) {
            Meteor.call('upsertMember', {name: name.val(), initials: init.val()});

            name.val('');
            init.val('');
        }
    }
};

Deps.autorun( function () {
    if (window.Sprints !== undefined) {
        var sprint = Sprints.findOne({}, {sort: {sprintNumber: -1}});

        if (sprint && sprint.startdate) {
            $('[start-date]').datepicker("setDate", new Date(sprint.startdate));
        }
        if (sprint && sprint.enddate) {
            $('[end-date]').datepicker("setDate", new Date(sprint.enddate));
        }
    }
});
