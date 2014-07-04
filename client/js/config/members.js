Template.configMembers.noAuthMembers = function () {
    var project = Projects.findOne();

    if (project) {
        return Members.find({projectId: project._id}, {sort: {'profile.name': 1}}).fetch();
    }
    return null;
};
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
        }, 0);
        return Meteor.users.find({projects: {$nin: [project._id]}}).fetch();
    }
};

Template.configMembers.projectMembers = function () {
    var project = Projects.findOne();

    if (project) {
        return Meteor.users.find({projects: {$in: [project._id]}}).fetch();
    }
};

Template.configMembers.isOnlyMember = function () {
    return Template.configMembers.projectMembers().length < 2;
};

Template.configMembers.rendered = function () {
    Template.projectConfig.items.members = Template.configMembers;
};

Template.configMembers.closing = function () {
    $('[members-dropdown]').select2('close');
};

Template.configMembers.events = {
    'click [add-member]': function () {
        var userId, name, initials;

        if (!Settings.findOne().isAuth) {
            name = $(arguments[1].find('[name="member__new__name"]'));
            initials = $(arguments[1].find('[name="member__new__initials"]'));

            if (name.val() !== '') {
                Meteor.call('upsertUserToProject', {name: name.val(), initials: initials.val()}, App.defaults.project);
            }
            else { // Loop through all members and check if their name/initials changed
                $('[no-auth-member]').each(function () {
                    var self = $(this),
                        id = self.attr('data-id'),
                        member = Members.findOne({_id: id}),
                        name = self.find('[no-auth-member__name]').val(),
                        initials = self.find('[no-auth-member__initials]').val();

                    if (name !== member.profile.name || initials !== member.initials) {
                        Meteor.call('upsertUserToProject',
                            { name: name,
                              initials: initials,
                              _id: id
                            }, App.defaults.project);
                    }
                });
            }

            name.val('');
            initials.val('');
        }
        else {
            userId = $(arguments[1].find('[name="site-members"]')).val();
            Meteor.call('upsertUserToProject', userId, App.defaults.project);
        }
    },
    'click [member__remove]': function () {
        var memberId = $(arguments[0].target).closest('[no-auth-member]').attr('data-id');
        Meteor.call('removeMemberFromProject', memberId, App.defaults.project);
    },
    'click .accordion__item__wrapper': function () {
        $('[members-dropdown]').select2('close');
    },
    'click .title': function () {
        $('[members-dropdown]').select2('close');
    },
    'click [user__remove]': function () {
        var userId = $(arguments[0].target).attr('data-userid');
        Meteor.call('removeUserFromProject', userId, App.defaults.project);
    }
};