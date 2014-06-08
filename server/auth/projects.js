Meteor.startup(function () {
    Projects.allow({
        insert: function (userId) {
            return userId !== null;
        },
        update: function (userId, doc) {
            return (userId && userId in doc.owners);
        },
        remove: function () {
            return false;
        }
    });
});
