var github = Meteor.settings.github;

if (github) {
    validateGithubSettings(github);

    ServiceConfiguration.configurations.remove({
        service: 'github'
    });

    ServiceConfiguration.configurations.insert({
        service: 'github',
        clientId: github.clientId,
        secret: github.clientSecret
    });
}

function validateGithubSettings(github) {
    if (!github.clientId) {
        throw 'Github: please specify a "clientId" in your settings';
    }

    if (!github.clientSecret) {
        throw 'Github: please specify a "clientSecret" in your settings';
    }
}

/*
//var https = Meteor.require('https');
var parseUrl = Meteor.require('url').parse,
  promisify = Meteor.require('deferred').promisify,
  request = promisify(Meteor.require('https').request);

WebApp.connectHandlers.use(function (req, res, next) {
  if (req.originalUrl.match(/^\/auth\/github\/callback/)) {
    console.log("Received github code: " + req.originalUrl);
    var code = req.originalUrl.match(/code=(.*)/)[1];
    console.log(code);

    var postData = JSON.stringify({
      client_id     : Scrummie.github.clientId,
      client_secret : Scrummie.github.clientSecret,
      code          : code,
      accept        : 'json'
      }),
      postOptions = parseUrl('https://github.com/login/oauth/access_token');

    postOptions.method = 'POST';
    postOptions.headers = {
      'Content-Type': 'application/json'
    };

    var req = request(postOptions, function (res) {
      res.on('data', function (d) {
        var json = JSON.parse(d.toString());
        var accessToken = json['access_token'];
        console.log(accessToken);

        var getOptions = parseUrl('https://api.github.com/user?access_token=' + accessToken);
        getOptions.method = 'GET';
        getOptions.headers = {
          'Content-Type': 'application/json',
          'User-Agent': Scrummie.github.appName
        };

        var req = request(getOptions, function (resp) {
          var jsonResponse = '';

          resp.setEncoding('utf8');
          resp.on('data', function (d) {
            jsonResponse += d.toString();
          })
            .on('end', function () {
              console.log(jsonResponse);
              console.dir(JSON.parse(jsonResponse));
            })
        });
        req.end();
      });
    });

    req.write(postData);

    req.end();
    */

    /*
    var req = request(postOptions, function (res) {
      res.on('data', function (d) {
        var json = JSON.parse(d.toString());
        var accessToken = json['access_token'];
        console.log(accessToken);

        var getOptions = parseUrl('https://api.github.com/user?access_token=' + accessToken);
        getOptions.method = 'GET';
        getOptions.headers = {
          'Content-Type': 'application/json',
          'User-Agent': Scrummie.github.appName
        };

        var req = request(getOptions, function (resp) {
          var jsonResponse = '';

          resp.setEncoding('utf8');
          resp.on('data', function (d) {
            jsonResponse += d.toString();
          })
            .on('end', function () {
                console.log(jsonResponse);
                console.dir(JSON.parse(jsonResponse));
            })
        });
        req.end();
      });
    });

    req.write(postData);

    req.end();

    */
/*
  }
  else
    next();
});
*/
