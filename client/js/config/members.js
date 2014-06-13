Template.configMembers.siteMembers = function () {
    return Meteor.users.find().fetch();
};
Template.configMembers.projectMembers = function () {
   var project = Projects.findOne();

   if (project) {
        console.log(project);
   }

    return Meteor.users.find().fetch();
};


Template.configMembers.rendered = function () {
    var select = $('[members-dropdown]');

    select.select2({
        allowClear: true,
        //formatResult: format,
        //formatSelection: format,
        minimumResultsForSearch: -1,
        placeholder: "All",
        dropdownCssClass: 'postit-filter__dropdown',
        containerCssClass: 'select2-colors',
        width: 150
    });
};

Template.configMembers.events = {
    'click add-member' : function () {

    }
};