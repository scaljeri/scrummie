Template.header.sprint = function () {
    return Sprints.findOne({ startdate: {$gt: new Date().getTime()}, enddate: { $lt: new Date().getTime()}});
}

Template.header.rendered = function () {
    App.outsideClick.register('[edit-task]', function () {
        $('[add-task]').removeClass('active');
    });
}

Template.header.events = {
    'click [config]': function () {
        App.outsideClick.isDirty = true;
        Template.configMenu.show();
    }
};
