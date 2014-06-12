Template.configLanes.lanes = function () {
    return LanesSetup.find({}, {sort: {index: 1}});
};