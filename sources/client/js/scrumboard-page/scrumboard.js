Template.scrumboard.helpers({
    lanes: function () {
        return LanesSetup.find(query(), {sort: {index: 1}}).fetch();
    },

    tasksOnLane: function (laneId) {
        var search = {laneId: laneId};

        if (App.filterColorId) {
            search.colorId = App.filterColorId;
        }
        return Tasks.find(query(search)).count();
    }
});

Template.scrumboard.rendered = function () {
    if (!App.defaults.projectId) {
        App.defaults.projectId = Projects.findOne({name: App.defaults.project})._id;
    }
};


/*
Deps.autorun(function () {
    if (window.Sprints !== undefined) {
        console.log("REGISTER");
        var sprint = Sprints.findOne(query({active: true}));
        Meteor.subscribe('tasks', sprint ? sprint.sprintNumber : -1);
    }
});
*/
