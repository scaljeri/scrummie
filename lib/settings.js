if (Meteor.isServer) {
    var fs = Npm.require('fs');

    Scrummie = {};

//loadSettings = function (Scrummie) {
    var settings = JSON.parse(fs.readFileSync(process.env.PWD + '/scrummie.json', 'utf8'));

    Scrummie.hipchat = settings.hipchat;
    delete settings.hipchat;

    Scrummie.github = settings.github;
    delete settings.github;

    Scrummie.uploadFolder = settings.uploadFolder;
    delete settings.uploadFolder;

    Scrummie.host = settings.host || {};
    if (settings.host) {
        Scrummie.baseUrl = (Scrummie.host.domain || 'localhost') +
            (Scrummie.host.port ? ':' + Scrummie.host.port : '111') +
            (Scrummie.host.path || '');
    }
    delete settings.host;

    for (var key in settings) {
        console.log('Ignore settings for  `' + key + '`');
    }
}
