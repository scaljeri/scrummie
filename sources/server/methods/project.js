var fs = Npm.require('fs'),
    path = Meteor.npmRequire('path');

Meteor.methods({
    'createProject': function (name, fileInfo, fileData) {
        var dir, imgType, resourceId, projectId;

        console.log("CREATE NEW PROJECT " + name + ' en ' + isAuthenticated());
        if (isAuthenticated()) {
            projectId = Projects.insert({
                creatorId: (Meteor.user()||{})._id, // if Authentication is disabled
                name: name,
                created: new Date().getTime()
            });

            if (Meteor.user()) {
                Meteor.users.update({_id: Meteor.user()._id}, {$push: {projects: projectId}});
            }
            inititalizeProject(projectId);

            if (fileInfo) {
                try {
                    imgType = path.extname(fileInfo.name);
                    resourceId = Resources.insert({originalName: fileInfo.name});
                    dir = path.normalize(Meteor.settings.uploadFolder || (process.env.PWD + '/.uploads')) + '/';

                    Projects.update({_id: projectId}, {$set: {resourceId: resourceId}});

                    Async.wrap(fs.writeFile)(dir + resourceId + imgType, fileData, "binary");
                    Resources.update({_id: resourceId}, {$set: {fileName: resourceId + imgType}});
                    return {status: 'ok'};
                }
                catch (e) {
                    Resources.remove({_id: resourceId}); // undo
                    console.dir(e);
                    return { status: 'error', msg: 'Could not save project icon'};
                }
            }
            else {
                return {status: 'ok'};
            }
        }
        return {status: 'error', msg: 'Please login first'};
    }
});

function inititalizeProject(projectId) {
    TaskColors.find().forEach(function (color) {
        color.projectId = projectId;
        delete color._id;
        TaskColorsSetup.insert(color);
    });

    Lanes.find().forEach(function (lane) {
        lane.projectId = projectId;
        delete lane._id;
        LanesSetup.insert(lane);
    });

    Settings.insert({
        projectId: projectId
    });
}
