Template.userLoggedOut.events({
    'click [login]' : function () {
       Meteor.loginWithGithub({requestPermissions: ['user', 'public_repo']}, function (err) {
          if (err) {
              console.log('Error msg: ' + err.message);
            throw err;
          }
          else {
              App.isLoggedIn = true;
          }
       });
    }
});