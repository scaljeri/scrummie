Template.configConnections.helpers({
    hipchat: function () {
        var settings = Settings.findOne(query());

        if (settings && settings.connections) {
            return Settings.findOne(query).connections.hipchat;
        }
    },
    jira: function () {
        var settings = Settings.findOne(query());

        if (settings && settings.connections) {
            return Settings.findOne(query()).connections.jira;
        }
    },
    empty: function () {
        var settings = Settings.findOne(query());
        return !settings || Object.keys(settings.connections).length === 0;
    }
});

Template.configConnections.closing = function (parent) {
    parent.find('.error').removeClass('error big-error');
    parent.find('[connection-toggle]').prop('checked', false);
};

Template.configConnections.rendered = function () {
    Template.projectConfig.items.connections = Template.configConnections;
};

Template.configConnections.events = {
    'click [jira-save]': function (e, tpl) {
        var checked = $('[data-type="jira"]').prop('checked'),
            user = $(tpl.find('[jira-user]')),
            passwd = $(tpl.find('[jira-password ]')),
            project = $(tpl.find('[jira-projectname ]')),
            errors = false,
            passwdVal;


        if (!user.val()) {
            user.addClass('animated rubberBand');
            user.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                user.removeClass('animated rubberBand')
                    .addClass((user.hasClass('error') ? 'big-' : '') + 'error');
            });
            errors = true;
        }
        if (!passwd.val()) {
            passwd.addClass('animated rubberBand');
            passwd.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                passwd.removeClass('animated rubberBand')
                    .addClass(passwd.hasClass('error') ? 'big-error' : 'error');
            });
            errors = true;
        }
        else {
            passwdVal = passwd.val();
            passwd.val('');
        }

        if (!project.val()) {
           project.val(App.defaults.project);
        }

        if (!errors) {
            $(tpl.findAll('.error')).removeClass('error error-big');

            var timeStart = new Date().getTime();
            $(tpl.find('[connection-toggle]')).prop('checked', false);
            setTimeout(function () {$(tpl.find('.spinner')).show();}, 500);
            Meteor.call('updateConnection', 'jira', App.defaults.project,
                { checked: checked,
                    username: user.val(),
                    password: passwdVal,
                    projectName: project.val()
                }, function (response) {
                    setTimeout(function () {
                        $(tpl.find('.spinner')).hide();
                    }, 2000 - (new Date().getTime() - timeStart));
                });
        }
    },
    'click [hipchat-save]': function (e, tpl) {
        var roomId = $(tpl.find('[hipchat-room-id]')),
            authToken = $(tpl.find('[hipchat-auth-token]'));

        if (!roomId.val()) {

        }
        else if (!authToken.val()) {

        }
        else {
            Meteor.call('updateConnection', 'hipchat', App.defaults.project, {roomId: roomId.val(), authToken: authToken.val()}, function (response) {

            });
        }
    },
    'change [on-off-switch-input]': function (e) {
        var checked = e.currentTarget.checked,
            cType = $(e.currentTarget).attr('data-type');

        Meteor.call('updateConnection', cType, App.defaults.project, {checked: checked});
    }
};