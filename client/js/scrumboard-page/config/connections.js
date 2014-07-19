Template.configConnections.helpers({
    hipchat: function () {
        var settings = Settings.findOne(query);

        if (settings && settings.connections) {
            return Settings.findOne(query).connections.hipchat;
        }
    },
    jira: function () {
        var settings = Settings.findOne(query);

        if (settings && settings.connections) {
            return Settings.findOne(query).connections.jira;
        }
    }
});

Template.configConnections.events = {
    'click [jira-save]': function (e, tpl) {
        var user = $(tpl.find('[jira-user]')),
            passwd = $(tpl.find('[jira-password ]'));

        if (!user.val()) {

        }
        else if (!passwd.val()) {

        }
        else {
            Meteor.call('updateConnection', 'jira', App.defaults.project, {username: user.val(), password: passwd.val()}, function (response) {

            });
        }
    },
    'change [on-off-switch-input]': function (e) {
        var checked = e.currentTarget.checked,
            cType = $(e.currentTarget).attr('data-type');

        Meteor.call('updateConnection', cType, App.defaults.project, {checked: checked});
    }
};