Template.scrumboard.lanes = function () {
    return LanesSetup.find({}, {sort: {index: 1}}).fetch();
};

Template.scrumboard.tasksOnLane = function (laneId) {
    var query = {laneId: laneId};

    if (App.filterColorId) {
        query.colorId = App.filterColorId;
    }
    return Tasks.find(query).count();
};

Template.scrumboard.rendered = function () {
    //var lanes = Lanes.find({}).fetch();
};

