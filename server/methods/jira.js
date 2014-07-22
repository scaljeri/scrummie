Meteor.methods({
    jiraStories: function (sprintNumber,projectName) {

        return fetchSprintJiraStories(sprintNumber,projectName);;
    }
});

function fetchSprintJiraStories(sprint,projectName) {
    var project = Projects.findOne({name: projectName});
    var settings = Settings.findOne({projectId: project._id});
    var JiraApi = Meteor.require('jira').JiraApi;

    console.log(settings);
    var jira = new JiraApi('https', 'jira.malmberg.nl', 443, settings.jira.username, settings.jira.password, '2');

    var fut = new Future();
    jira.searchJira("project in("+ settings.jira.projectname +") and issuetype in (Story) and Sprint = 'Sprint " + sprint + "'", {}, function(error, result) {

        fut['return'](result);

    });
    return fut.wait();

}

