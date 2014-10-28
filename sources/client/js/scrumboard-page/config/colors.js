Template.configColors.helpers({
    colors: function () {
        return TaskColorsSetup.find(query(), {sort: {index: 1}}).fetch();
    }
});

Template.configColors.rendered = function () {
    $(this.find('.sortable'))
            .sortable()
            .disableSelection();
};

Template.configColors.events = {
    'click [config-color__trash]': function (e) {
    },
    'click [config-color__edit]': function (e) {
    }
};
