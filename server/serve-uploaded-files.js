var fs = Meteor.require('fs');


if (Meteor.isServer) {
  WebApp.connectHandlers.stack.splice(0, 0, {
    route: '/uploads',
    handle: function (req, res, next) {

      console.log("SERVRE UPLOADED FILES");
      var path = req.originalUrl.substr(1);
      console.log(process.env.PWD + '/.' + path);

      fs.readFile(process.env.PWD + '/.' + path, {encoding: 'binary'}, function (err,data) {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, {
          'Content-Type': 'image/png'
        });
        //res.setEncoding("binary");
        res.write(data);
        res.end();
        console.log("DNE");
      });
    }
  });
}