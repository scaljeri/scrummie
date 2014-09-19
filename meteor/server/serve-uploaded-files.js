var fs = Npm.require('fs'),
    path = Meteor.npmRequire('path');

if (Meteor.isServer) {
  WebApp.connectHandlers.use(function (req, res, next) {
    var dir, data;

    if (req.originalUrl.match(/^\/uploads/)) {
      console.log("SERVRE UPLOADED FILES: " + req.originalUrl);

      // TODO: rewrite to async file read
      //fs.readFile(process.env.PWD + '/.' + path, {encoding: 'binary'}, function (err, data) {
      try {
          dir = path.normalize(Meteor.settings.uploadFolder || (process.env.PWD + '/.uploads')) + '/';
          data = fs.readFileSync(dir + path.basename(req.originalUrl));

          res.writeHead(200);
          /*res.writeHead(200, {
              'Content-Type': 'image/' + extension
          });
          */
          res.write(data);
          res.end();
          console.log("DNE");
      }
      catch(e) {  // TODO: Cannot throw 404 here
        throw 'No such file: ' + dir + path.basename(req.originalUrl);
        //return res.status(404).send('Not found');
      }
    }
    else
      next();
  });
}