Template.scrumboard.lanes = function () {
    return LanesSetup.find(query(), {sort: {index: 1}}).fetch();
};

Template.scrumboard.tasksOnLane = function (laneId) {
    var search = {laneId: laneId};

    if (App.filterColorId) {
        search.colorId = App.filterColorId;
    }
    return Tasks.find(query(search)).count();
};

Template.scrumboard.rendered = function () {
    if (!App.defaults.projectId) {
        App.defaults.projectId = Projects.findOne({name: App.defaults.project})._id
    }
};

