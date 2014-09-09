Meteor.startup(function () {
    Tasks.allow({
        insert: function (userId, doc) {
            var retVal = false;

            if (userId) {
                retVal = isDocumentEditable(doc); // doc needs a productId
            }

            return retVal;
        },
        update: function (userId, doc) {
            var retVal = false;

            if (userId) {
                retVal = isDocumentEditable(doc);
            }

            return retVal;
        },
        remove: function () {
            return false; // never!
        },
        fetch: ['productId'] // fields to load for `update` and `remove`
    });
});