Template.dialog.rendered = function () {
    $(this.find('[dialog]')).dialog(
            {
                autoOpen: false,
                draggable: false,
                modal: true,
                resizable: false,
                position: { my: "bottom", at: "center", of: window },
                width: 470
            });

    App.ignoreClickFrom.add('.ui-widget-overlay');
    $('.ui-dialog').click(function (e) {
        var item;

        //if ($(e.target).hasClass('ui-icon-closethick')) {

        //}
        e.stopPropagation();

        var button = $(e.target).attr('dialog-button');

        if (button == 'help') {
            new Robot(Session.get('alert').help.preset).start({x: e.pageX, y: e.pageY});
        }
        else if (button === 'confirm-yes') {
            ((App.dialog || {}).yes || App.noob)();
        }
        else if (button === 'confirm-no') {
            ((App.dialog || {}).no || App.noob)();
        }

        App.dialog = null;
        setTimeout(function () {
            Session.set('alert', null);
        }, 400);
    });
};
Template.dialog.helpers({
    alert: function () {
        if (Session.get('alert')) {
            $('[dialog]').dialog('open');
        }
        else {
            $('[dialog]').dialog('close');
        }

        return Session.get('alert');
    }
});
