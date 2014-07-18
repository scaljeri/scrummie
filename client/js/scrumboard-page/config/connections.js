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
    'click [github-save]': function (e, tpl) {
        var clientId = $(tpl.find('[github-client-id]')),
            clientSecret = $(tpl.find('[github-client-secret]'));

        if (!clientId.val()) {

        }
        else if (!clientSecret) {

        }
        else {
            Meteor.call('saveGithuCredentials', clientId.val(), clientSecret.val(), function (response) {

            });
        }
    },
    'change [on-off-switch-input]': function (e) {
        var checked = e.currentTarget.checked,
            cType = $(e.currentTarget).attr('data-type');

        Meteor.call('updateConnection', cType, App.defaults.project, {checked: checked});
    }
};