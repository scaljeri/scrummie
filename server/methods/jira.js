Meteor.methods({
    jiraStories: function (sprintNumber,projectName) {
        return fetchSprintJiraStories(sprintNumber,projectName);
    }
});

function fetchSprintJiraStories(sprintNumber,projectName) {
    var settings, JiraApi, project = Projects.findOne({name: projectName});

    if (project) {
        settings = Settings.findOne({projectId: project._id});
        JiraApi = Meteor.require('jira').JiraApi;

        var jira = new JiraApi('https', 'jira.malmberg.nl', 443, settings.jira.username, settings.jira.password, '2');

        var fut = new Future();
        jira.searchJira("project in("+ settings.jira.projectname +") and issuetype in (Story) and Sprint = 'Sprint " + sprintNumber + "'", {}, function(error, result) {
            fut['return'](result);
        });

        return fut.wait();
    }

    return null;
}

