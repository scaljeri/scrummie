Template.errorDialog.rendered = function () {
    $(this.find('[error-dialog]')).dialog(
        {
            autoOpen: false,
            draggable: false,
            modal: true,
            resizable: false
        });
};

Template.errorDialog.message = function () {
    return  App.errorMessage;
};