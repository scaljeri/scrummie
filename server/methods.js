Meteor.methods({
    saveTask: function(task) {
        task.modifiedDate = new Date().getTime();
        Tasks.upsert({_id: task._id}, {$set: task});
    },
    updatePosition: function (postit) {
        Postits.update({ _id: postit._id}, postit);
        sortPostits(postit);
    },
    insertPostit: function (postit) {
        if (postit._id) {
            //Postits.update(postit);
        }
        else {
            postit.left = 0;
            postit.top = 0;
            postit.index = 0;
            Postits.insert(postit);
            sortPostits(postit);
        }
    }
});

function sortPostits(postit) {
                    // Meteor.Postits.find....
    var postits = Postits.find({}, { sort: {index: 1}}).fetch();

    for(var i = postits.length - 1; i >= 0;  i--) {
        console.log(postits[i]._id);
        if (postits[i]._id === postit._id) {
            postits[i].index = postits.length;
        }
        else {
            postits[i].index = i;
        }
        Postits.update({ _id: postits[i]._id}, postits[i]);
    }
}