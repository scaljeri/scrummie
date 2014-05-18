Template.home.projects = function () {
    return Projects.find();
};

Template.home.events = {
    'click [create-project]': function () {
        Projects.insert({name: $('[project-name]').val(), created: new Date().getTime()});
    }
};