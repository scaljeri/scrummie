Template.configConnections.helpers({
    github: function () {
        var settings = Settings.findOne(query);

        if (settings) {
            return Settings.findOne(query).connections.github;
        }
    },
    jira: function () {
        var settings = Settings.findOne(query);

        if (settings) {
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
    }
};