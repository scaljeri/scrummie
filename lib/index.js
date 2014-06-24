if (Meteor.isServer) {
    Scrummie = {};

    Meteor.startup(function () {
        console.log("STARTING....");
        console.log("TEST: " + Meteor.settings.github);
        console.dir(Meteor.settings);
    });
}