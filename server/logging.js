/*var winston = Meteor.require('winston'),
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
