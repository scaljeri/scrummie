var settings = {
    baseUrl: Meteor.settings.baseUrl,
    authenticate: Meteor.settings.authentication.enabled || false,
    services: {}
};

settings.services.jira = isJiraActive();

Inject.obj('settings', settings);

function isJiraActive() {
    var jira = Meteor.settings.services.jira;

    return jira && jira.active;
}
