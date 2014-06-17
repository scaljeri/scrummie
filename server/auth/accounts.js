Meteor.startup(function () {
    Scrummie.updateUserProfile = function (user) {
        var accessToken = user.services.github.accessToken,
            result, profile;


        result = Meteor.http.get('https://api.github.com/user', {
            params: { access_token: accessToken },
            headers: {'User-Agent': Scrummie.appName}
        });

        if (result.error) {
            throw result.error;
        }

        profile = _.pick(result.data,
            'login',
            'name',
            'avatar_url',
            'url',
            'company',
            'blog',
            'location',
            'email',
            'bio',
            'html_url');

        user.profile = profile;
        if (user.projects === undefined) { // only do this initially
            user.projects = [];
        }
        if (user.initials === undefined) { // idem
            user.initials = profile.name ? parseProfileName(profile.name) : '??';
        }

        return user;
    };

    Accounts.onCreateUser(function (options, user) {
        return Scrummie.updateUserProfile(user);
    });

    function parseProfileName(name) {
        var parts = name.split(' '),
            output = parts[0].substring(0, 1).toUpperCase();

        for (var i = 1; i < parts.length - 1; i++) {
            output += parts[i].substring(0, 1);
        }

        if (parts.length > 1) {
            output += parts[parts.length - 1].substring(0, 1).toUpperCase();
        }

        return output;
    }

    Meteor.users.allow({
        insert: function () {
            return false;
        },
        update: function (userId, doc, fieldNames) {
            return userId === doc._id && fieldNames.length === 1 && fieldNames[0] === 'initials';
        },
        remove: function () {
            return false;
        }
    });
});
