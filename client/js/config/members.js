Template.configMembers.siteMembers = function () {
    var project = Projects.findOne();

    if (project) {
        setTimeout(function () {
            var select = $('[members-dropdown]');

            if (select) {
                select.select2({
                    allowClear: true,
                    minimumResultsForSearch: -1,
                    placeholder: "All",
                    dropdownCssClass: 'postit-filter__dropdown',
                    containerCssClass: 'select2-colors',
                    width: '50%'
                });
            }
        },0);
        return Meteor.users.find({projects: {$nin: [project._id]}}).fetch();
    }
};

Template.configMembers.projectMembers = function () {
   var project = Projects.findOne();

   if (project) {
       return Meteor.users.find({projects: {$in: [project._id]}}).fetch();
   }
};

Template.configMembers.rendered = function () {
    Template.projectConfig.items.members = Template.configMembers;
};

Template.configMembers.closing = function () {
    $('[members-dropdown]').select2('close');
};

Template.configMembers.events = {
    'click [add-member]' : function () {
        var userId = $(arguments[1].find('[name="site-members"]')).val();

        Meteor.call('addUserToProject', userId, App.defaults.project);
    },
    'click .accordion__item__wrapper' : function () {
        $('[members-dropdown]').select2('close');
    },
    'click .title' : function () {
        $('[members-dropdown]').select2('close');
    },
    'click [member__remove]' : function () {
        var userId = $(arguments[0].target).attr('data-userid');
        Meteor.call('removeUserFromProject', userId, App.defaults.project);
    }
};