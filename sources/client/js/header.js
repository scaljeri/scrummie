Template.header.helpers({
    project: function () {
        return App.defaults.project;
    },

    /*
     Template.header.showConfig = function () {
     var retVal = false;

     if (App.page === 'scrumboard' && hasPermissionsInProject(App.defaults.project)) {
     retVal = true;
     }

     return retVal;
     };
     */

    sprint: function () {
        return Sprints.findOne(query({ startdate: {$gt: new Date().getTime()}, enddate: { $lt: new Date().getTime()}}));
    }
});

Template.header.rendered = function () {
    App.outsideClick.register('[edit-task]', function () {
        $('[add-task]').removeClass('active');
    });
};
