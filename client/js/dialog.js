Template.dialog.helpers({
    rendered: function () {
        $(this.find('[dialog]')).dialog(
            {
                autoOpen: false,
                draggable: false,
                modal: true,
                resizable: false
            });

        App.ignoreClickFrom.add('.ui-widget-overlay');
        $('.ui-dialog').click(function (e) {
            Session.set('alert', null);
            e.stopPropagation();
        });
    },
    alert: function () {
        if (Session.get('alert')) {
            $('[dialog]').dialog('open');
        }

        return Session.get('alert');
    },
    events: {}
});
