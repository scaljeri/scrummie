Template.configColors.helpers({
    colors: function () {
        return TaskColorsSetup.find(query(), {sort: {index: 1}}).fetch();
    },

    rendered: function () {
        $(this.find('.sortable'))
                .sortable()
                .disableSelection();
    },

    events: {
        'click [config-color__trash]': function (e) {
        },
        'click [config-color__edit]': function (e) {
        }
    }
});