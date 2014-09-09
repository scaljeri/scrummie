Meteor.startup(function () {
    Lanes.allow({
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
