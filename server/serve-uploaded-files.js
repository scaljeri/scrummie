//var fs = Meteor.require('fs');
var fs = Npm.require('fs');


if (Meteor.isServer) {
  //WebApp.connectHandlers.stack.splice(0, 0, {
  WebApp.connectHandlers.use(function (req, res, next) {
    //route: '/uploads',
    //handle: function (req, res, next) {

    console.log("SERVRE UPLOADED FILES");
    var path = req.originalUrl.substr(1);
    console.log(process.env.PWD + '/.' + path);

    //fs.readFileSync(process.env.PWD + '/.' + path, {encoding: 'binary'}, function (err,data) {
    var data = fs.readFileSync(process.env.PWD + '/.' + path, data);
    //if (err) {
      //return console.log(err);
    //}
    res.writeHead(200, {
      'Content-Type': 'image/png'
    });
    //res.setEncoding("binary");
    res.write(data);
    res.end();
    console.log("DNE");
  });
  //}
//}
//)
//;
}