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
        user.initials = createInitials(profile);//.name ? parseProfileName(profile.name) : '??';

        if (user.projects === undefined) {
            user.projects = [];
        }

        if (!profile.name) {
            profile.name = profile.login;
        }

        return user;
    };

    Accounts.onCreateUser(function (options, user) {
        return Scrummie.updateUserProfile(user);
    });

    function createInitials(profile) {
        var email = profile.email, output;

        if (profile.name) {
            output = profile.name.match(/\b(\w)/g).join('');
        }
        else if (email) {
            output = (email[0] + email[email.indexOf('@')+1]).toUpperCase();
        }
        else {
            output = '??';
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
