App = {subs: {}, defaults: {}};

if (Meteor.isServer) {
    Scrummie = {};

    Meteor.startup(function () {
        console.log("STARTING....");
        console.dir(Meteor.settings);
    });
}
