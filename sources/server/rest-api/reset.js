WebApp.connectHandlers.use(function (req, res, next) {
    if (req.originalUrl.match(/^\/reset/)) {
        console.log("RESET DB: " + req.originalUrl);

        res.writeHead(200);
        res.write(JSON.stringify({msg: resetDatabase()}));
        res.end();
        console.log("DONE");
    }
    else
        next();
});

function resetDatabase() {
    if (Meteor.settings.testing) {
        Projects.remove({});
        Sprints.remove({});
        Lanes.remove({});
        LanesSetup.remove({});
        Tasks.remove({});
        TaskColors.remove({});
        TaskColorsSetup.remove({});
        Members.remove({});
        Resources.remove({});

        dbSetup();

        return 'Database resetted';
    }

    return 'Could not reset the database :)';
}
