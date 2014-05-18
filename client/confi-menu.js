Template.configMenu.sprint = function () {
    return Sprints.findOne({}, {sort: {sprintNumber: -1}});
};

Template.configMenu.lanes = function () {
    return Lanes.find({}, {sort: {index: 1}});
};

Template.configMenu.sprintNumber = function () {
    var sprint = Template.configMenu.sprint();//Sprints.findOne({}, {sort: {sprintNumber: -1}});

    if (sprint) {
        return  sprint.sprintNumber + (sprint.active === false ? 1 : 0 );
    }
    return null;
};

Template.configMenu.readonlySprintNumber = function () {
    var sprint = Template.configMenu.sprint();//Sprints.findOne({}, {sort: {sprintNumber: -1}});
    if (sprint) {
        return  sprint.sprintNumber === undefined ? '' : 'readonly';
    }
};

Template.configMenu.isSprintOpen = function () {
    var sprint = Template.configMenu.sprint();//Sprints.findOne({}, {sort: {sprintNumber: -1}});

    if (sprint) {
        return sprint.active === true;
    }
};

Template.configMenu.members = function () {
    return Members.find({}, {sort: {name: 1}});
};

Template.configMenu.rendered = function () {
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

Template.configMenu.show = function () {
    $('[config-menu]').addClass('visible');

    var sprint = Sprints.find({}, {sort: {sprintNumber: -1}});
    $('[start-date]').datepicker("setDate", new Date(sprint.startdate));
    $('[end-date]').datepicker("setDate", new Date(sprint.enddate));

    App.outsideClick.register('.config-content', Template.configMenu.hide);
};

Template.configMenu.hide = function () {
    $('[config-menu]').removeClass('visible');
    App.outsideClick.remove(Template.configMenu.hide);
};

Template.configMenu.sprintButtonLabel = function () {
    var sprint = Sprints.findOne({projectId: App.defaults.project}, {sort: {sprintNumber: -1}});

    if (sprint) {
        return (sprint.active === true ? 'End' : 'Start') + ' Sprint';
    }
    else {
        return 'Start Sprint';
    }
};

Template.configMenu.events = {
    'click *': function (event) { // make sure the popover is not closed
        event.stopPropagation();
    },
    'click [stop-start-sprint]': function () {
        var sprintNumber = $('[sprint-number]').removeClass('error'),
            startdate = $('[start-date]'),
            enddate = $('[end-date]').removeClass('error'), sprint;


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
        sprint = Sprints.findOne({sprintNumber: sprintNumber, projectId: App.defaults.project});

        if (!error) {
            // Change subscriptions sprint number
            App.subs.tasks.stop();
            App.subs.taskPositions.stop();
            App.subs.tasks = Meteor.subscribe('tasks', App.defaults.project, (sprint === undefined ? sprintNumber : -3));
            App.subs.taskPositions = Meteor.subscribe('task-positions', App.defaults.project, (sprint === undefined ? sprintNumber : -3));

            Meteor.call('upsertSprint', {
                projectId: App.defaults.project,
                sprintNumber: sprintNumber,
                startdate: startdate.val() === 'Now' ?
                    new Date() : new Date(startdate.val()),
                enddate: new Date(enddate.val()),
                active: sprint === undefined // if sprint is defined --> its closed now (active === false)
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
