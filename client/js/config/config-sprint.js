Template.configSprint.sprint = function () {
    return Sprints.findOne({}, {sort: {sprintNumber: -1}});
};

Template.configSprint.sprintNumber = function () {
    var sprint = Template.configSprint.sprint();

    if (sprint) {
        return  sprint.sprintNumber + (sprint.active === false ? 1 : 0 );
    }
    return null;
};

Template.configSprint.readonlySprintNumber = function () {
    var sprint = Template.configSprint.sprint();//Sprints.findOne({}, {sort: {sprintNumber: -1}});
    if (sprint) {
        return  sprint.sprintNumber === undefined ? '' : 'readonly';
    }
};

Template.configSprint.isSprintOpen = function () {
    var sprint = Template.configSprint.sprint();//Sprints.findOne({}, {sort: {sprintNumber: -1}});

    if (sprint) {
        return sprint.active === true;
    }
};

Template.configSprint.sprintButtonLabel = function () {
    var sprint = Sprints.findOne({active: true});

    return (sprint ? 'End' : 'Start') + ' Sprint';
};
