Meteor.methods({
    jiraStories: function (sprintNumber, projectName) {
        return fetchSprintJiraStories(sprintNumber, projectName);
    }
});

function fetchSprintJiraStories(sprintNumber, projectName) {
    var settings, JiraApi, project = Projects.findOne({name: projectName});

    if (project) {
        settings = getJiraSettings(project);
        JiraApi = Meteor.require('jira').JiraApi;


        var jira = new JiraApi(settings.protocol, settings.url, settings.port, settings.username, settings.password, '2');

        var fut = new Future();
        jira.searchJira("project in(" + settings.projectName + ") and issuetype in (Story) and Sprint = 'Sprint " + sprintNumber + "'", {}, function (error, result) {
            fut['return'](result);
        });

        return fut.wait();
    }

    return null;
}

function getJiraSettings(project) {
    var jira, settings = Settings.findOne({projectId: project._id}).jira || {};

    if (Meteor.settings && Meteor.settings.services) {
        jira = Meteor.settings.services.jira || {};
        settings.url = jira.url;
        settings.protocol = jira.protocol;
        settings.port = jira.port;
    }

    return settings;
}

