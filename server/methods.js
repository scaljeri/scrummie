Meteor.methods({
    upsertTask: function(task) {
        if (task.color !== undefined) {
            var color = TaskColors.findOne({color: task.color});
            task.color = color._id;
        }
        task.x = 0;
        task.y = 0;
        task.updated = new Date().getTime();

        Tasks.upsert({_id: task._id}, {$set: task});
    },
    updatePostitPosition: function (position) {
        console.dir(position);
        console.log('id=' + position._id);
        Tasks.update({_id: position._id}, {$set: {x: position.x, y: position.y, updated: new Date().getTime()}});
    }
});
