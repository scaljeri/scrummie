Template.configSprint.created = function () {
    App.eventHub.on('project.initialize', initialize);
};

Template.configSprint.helpers({
    sprint: function () {
        return getLastSprint() || {};
    },
    sprintNumber: function () {
        var sprint = getLastSprint();

        if (sprint) {
            return  sprint.sprintNumber + (sprint.active === false ? 1 : 0 );
        }
        return null;
    },

    isReadonly: function () {
        var output = 'readonly',
                sprint = getLastSprint();

        if (!sprint || !sprint.active) {
            output = null;
        }

        return output;
    },

    sprintButtonLabel: function () {
        var sprint = Sprints.findOne(query({active: true}));

        return (sprint ? 'End' : 'Start') + ' Sprint';
    }

    /*
     initialize: function () {
     $('[start-date]').datepicker({
     currentText: 'Now',
     minDate: 0,
     disabled: true,
     onSelect: function (dateText) {
     var date = new Date(dateText);
     date.setDate(date.getDate() + 1);
     $('[end-date]').datepicker('option', 'minDate', date);
     }
     });
     $('[end-date]').datepicker({disabled: true, minDate: 0});

     this.updateDates = Deps.autorun(function () {
     var sprint = getLastSprint(),
     isDisabled = true;

     if ((!sprint || !sprint.active) && hasPermissionsInProject(App.defaults.project)) {
     isDisabled = false;
     }

     $('[start-date], [end-date]').datepicker('option', 'disabled', isDisabled);
     if (sprint) {
     $('[start-date]').datepicker('setDate', new Date(sprint.startdate));
     $('[end-date]').datepicker('setDate', new Date(sprint.enddate));
     }
     });
     },*/
});

Template.configSprint.rendered = function () {
    App.ignoreClickFrom.add('#ui-datepicker-div');
    App.ignoreClickFrom.add('.ui-datepicker-header'); // FIXME: .ui-datepicker-header is inside #ui-datepicker-div, but it is needed
};

Template.configSprint.destroyed = function () { // TODO: Find out why this function is never called
    this.updateDates.stop();
};

Template.configSprint.events = {
    'click [start-date]': function (e) {
        $(e.target).datepicker('show');
    },
    'click [calendar--start]': function (e) {
        $(e.target).datepicker('show');
    },
    'click [end-date]': function (e) {
        $(e.target).datepicker('show');
    },
    'click [calendar--end]': function (e) {
        $(e.target).datepicker('show');
    },
    'click [stop-start-sprint]': function () {
        var sprintNumber = $('[sprint-number]').removeClass('error'),
                startdate = $('[start-date]'),
                enddate = $('[end-date]').removeClass('error'),
                fte = parseFloat($('[sprint-fte]').val()),
                error = false,
                sprint = Sprints.findOne(query({active: true}));

        if (isNaN(fte)) {
            fte = null;
        }

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
        if (!error) {
            if (sprint && sprint.active) { // stop sprint
                saveSprint(sprint, startdate, enddate, fte, sprintNumber);
            }
            else { // to start a sprint first check if it doesn't exist yet
                Meteor.call('checkIfSprintExists', App.defaults.project, sprintNumber, function (err, response) {
                    // Change subscriptions sprint number
                    if (response.present) {
                        Session.set('alert', {
                            message: 'Sprint already exists.<br>Do you want to replace it ?',
                            confirm: {
                                yes: {
                                    label: 'Yes'
                                },
                                no: {
                                    label: 'No'
                                }
                            }
                        });
                        // it is not possible to set the cb on the Session
                        App.dialog = { yes: saveSprint.bind(null, sprint, startdate, enddate, fte, sprintNumber)};
                    }
                    else {
                        saveSprint(sprint, startdate, enddate, fte, sprintNumber);
                    }
                });
            }
        }

        //$('[stop-start-sprint]').addClass('active');
        /*
         Meteor.call('upsertTask', $('[edit-task-form]').serializeObject());
         $('[edit-task]').css('visibility', 'hidden');
         $('[add-task]').removeClass('active');
         $('[edit-task-form]')[0].reset();
         */
    }
};

function initialize() {
    $('[start-date]').datepicker({
        currentText: 'Now',
        minDate: 0,
        disabled: true,
        onSelect: function (dateText) {
            var date = new Date(dateText);
            date.setDate(date.getDate() + 1);
            $('[end-date]').datepicker('option', 'minDate', date);
        }
    });
    $('[end-date]').datepicker({disabled: true, minDate: 0});

    this.updateDates = Deps.autorun(function () {
        var sprint = getLastSprint(),
                isDisabled = true;

        if ((!sprint || !sprint.active) && hasPermissionsInProject(App.defaults.project)) {
            isDisabled = false;
        }

        $('[start-date], [end-date]').datepicker('option', 'disabled', isDisabled);
        if (sprint) {
            $('[start-date]').datepicker('setDate', new Date(sprint.startdate));
            $('[end-date]').datepicker('setDate', new Date(sprint.enddate));
        }
    });
}

function getLastSprint() {
    return Sprints.findOne(query(), {sort: {sprintNumber: -1}});
}

function saveSprint(sprint, startdate, enddate, fte, sprintNumber) {
    subs.subscribe('tasks', App.defaults.project, (sprint === undefined ? sprintNumber : -3));
    subs.subscribe('task-positions', App.defaults.project, (sprint === undefined ? sprintNumber : -3));

    Meteor.call('upsertSprint', App.defaults.project, {
        sprintNumber: sprintNumber,
        startdate: startdate.val() === 'Now' ? new Date() : new Date(startdate.val()),
        enddate: new Date(enddate.val()),
        active: sprint === undefined, // if sprint is defined --> its closed now (active === false)
        fte: fte
    }, function (result) {
        // TODO
    });
}
