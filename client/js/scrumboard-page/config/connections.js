Template.configConnections.helpers({
    github: function () {
        var settings = Settings.findOne(query);

        if (settings) {
            return Settings.findOne(query).connections.github;
        }
    }
});

Template.configConnections.events = {
    'click [github-save]': function (e, tpl) {
        var clientId = $(tpl.find('[github-client-id]')),
            clientSecret = $(tpl.find('[github-client-secret]'));

        debugger;
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