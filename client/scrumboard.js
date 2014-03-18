Template.scrumboard.lanes = function () {
    return Lanes.find({}, {sort: {index: 1}}).fetch();
};