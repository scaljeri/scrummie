var fs = Npm.require('fs');

loadSettings = function (obj) {
  var settings = JSON.parse(fs.readFileSync(process.env.PWD + '/scrummie.json', 'utf8'));

  obj.hipchat      = settings.hipchat;
  obj.github       = settings.github;
  obj.uploadFolder = settings.uploadFolder;
};
