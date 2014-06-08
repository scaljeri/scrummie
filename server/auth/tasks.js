Meteor.startup(function () {
    Tasks.allow({
        insert: function (userId) {
            return userId !== null;
        },
        update: function (userId, doc) {
            if (userId) {
                var user = Accounts.findOne({_id: userId});

                return userId && doc.projectId in user.projects;
            }
            else {
                return false;
            }
        },
        remove: function () {
            return false; // never!
        }
    });
});