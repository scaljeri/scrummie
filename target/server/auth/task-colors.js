Meteor.startup(function () {
    TaskColors.allow({
        insert: function () {
            return false;
        },
        update: function () {
            return false;
        },
        remove: function () {
            return false;
        }
    });
});
