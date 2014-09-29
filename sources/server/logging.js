/*var winston = Meteor.npmRequire('winston'),
  MongoDB = Npm.require('winston-mongodb').MongoDB;
  */

initializeLogger = function () {
    /*
  var options, loglevel = Scrummie.loglevel || 'error';

  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({level: loglevel}),
      //new (winston.transports.MongoDB)(options)
    ], exceptionHandlers: [ new winston.transports.Console() ]
    //], exceptionHandlers: [ new (winston.transports.MongoDB)(options), new winston.transports.Console() ]
  });

  if (Scrummie.mongo) {
    var host = Scrummie.host && Scrummie.host.domain ? Scrummie.host.domain : 'localhost';
      options = {
      host: Scrummie.mongo.host || host,
      db: Scrummie.mongo.db || 'scrummie',
      collection: 'log',
      level: loglevel
    };
    if (Scrummie.mongo.port) {
      options.port = Scrummie.mongo.port;
    }

    logger.add(winston.transports.MongoDB, options);
  }
    */
};

console.log('ROOT_URL: ' + process.env.ROOT_URL);
console.log('PORT: ' + process.env.RORT);
console.log('MONGO_URL: ' + process.env.MONGO_URL);
console.log('METEOR_SETTINGS: ' + process.env.METEOR_SETTINGS);

WebApp.connectHandlers.use(function (req, res, next) {
    console.log('requested url: ' + req.originalUrl);
    next();
});
