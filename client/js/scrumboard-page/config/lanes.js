Template.configLanes.lanes = function () {
    return LanesSetup.find(query(), {sort: {index: 1}});
};

Template.configLanes.rendered = function () {
    $(this.find('.sortable'))
        .sortable()
        .disableSelection();
};

Template.configLanes.events = {
    'click [config-color__trash]': function (e) {
        debugger;
    },
    'click [config-color__edit]': function (e) {
        debugger;
    }
};