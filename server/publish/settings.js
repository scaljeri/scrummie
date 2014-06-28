Meteor.startup(function () {
    Meteor.publish('settings', function () {
        var enabled = Meteor.settings.authenticate === undefined ? false : Meteor.settings.authenticate;

        this.added("settings", "settings", {isAuth: enabled});
        this.ready();
    });
});