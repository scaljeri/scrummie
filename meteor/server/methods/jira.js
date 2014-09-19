var crypto = Meteor.npmRequire('crypto'),
    algorithm = 'aes256';

Meteor.methods({
    jiraStories: function (sprintNumber, projectName) {
         var retVal = fetchSprintJiraStories(sprintNumber, projectName), error;

        if (typeof retVal === 'string') {
            error = retVal.split(/:/);
            throw new Meteor.Error(error[0], error[1]);
        }
        else {
            return retVal;
        }
    }
});

function fetchSprintJiraStories(sprintNumber, projectName) {
    var decipher, passwd, settings, JiraApi, project = Projects.findOne({name: projectName});

    if (project) {
        settings = getJiraSettings(project);
        JiraApi = Meteor.require('jira').JiraApi;
        decipher = crypto.createDecipher(algorithm, 'KJHG7yg)a1(_');
        passwd = decipher.update(settings.password, 'hex', 'utf8') + decipher.final('utf8');

        var jira = new JiraApi(settings.protocol, settings.url, settings.port, settings.username, passwd, '2');

        var fut = new Future();
        jira.searchJira("project in(" + settings.projectName + ") and issuetype in (Story, Incident) and Sprint = 'Sprint " + sprintNumber + "'", {}, function (error, result) {
            fut.return(error || result);
        });

        return fut.wait();
    }

    return null;
}

function getJiraSettings(project) {
    var jira, settings = (Settings.findOne({projectId: project._id}).connections||{}).jira || {};

    if (Meteor.settings && Meteor.settings.services) {
        jira = Meteor.settings.services.jira || {};
        settings.url = jira.url;
        settings.protocol = jira.protocol;
        settings.port = jira.port;
    }

    return settings;
}

