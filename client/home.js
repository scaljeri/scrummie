Template.home.projects = function () {
    return Projects.find();
};

Template.home.events = {
    'click [create-project]': function () {
        Meteor.call('createProject', {name: $('[project-name]').val(), created: new Date().getTime()});
    }
};