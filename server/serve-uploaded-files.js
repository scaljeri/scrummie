//var fs = Meteor.require('fs');
var fs = Npm.require('fs');

if (Meteor.isServer) {
  WebApp.connectHandlers.use(function (req, res, next) {
    var path;

    console.log("SERVRE UPLOADED FILES: " + req.originalUrl);
    if (req.originalUrl.match(/^\/uploads/)) {
      path = req.originalUrl.substr(1);
      //extension = path.match(/\..*$/);
      console.log(process.env.PWD + '/.' + path);

      // TODO: rewrite to async file read
      //fs.readFile(process.env.PWD + '/.' + path, {encoding: 'binary'}, function (err, data) {
      try {
          var data = fs.readFileSync(process.env.PWD + '/.' + path, data);

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
        throw 'No such file';
        //return res.status(404).send('Not found');
      }
    }
    else
      next();
  });
//}
//)
//;
}