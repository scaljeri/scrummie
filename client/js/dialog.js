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
            if ($(e.target).hasClass('ui-icon-closethick')) {
                Session.set('alert', null);
            }

            if ($(e.target).attr('dialog-help') === undefined ) {
                e.stopPropagation();
            }
            else if(Session.get('alert').help) {
                new Robot(Session.get('alert').help.preset).start({x: e.pageX, y: e.pageY})
            }
        });
    },
    alert: function () {
        if (Session.get('alert')) {
            $('[dialog]').dialog('open');
        }

        return Session.get('alert');
    }
});
/*
Template.dialog.events = {
    'click [dialog-help]': function (e) {
        debugger;
    }
}*/
