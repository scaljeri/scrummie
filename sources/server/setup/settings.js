var settings = Settings.find().fetch();

updateSettingsTo = {
    '0.0.1': function () {
        settings.forEach(function (item) {
            delete item.jira;
            delete item.hipchat;

            Settings.update(item, {$unset: {jira: '', hipchat: ''} });
        });
    }
};

