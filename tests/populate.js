var mongoose = require('mongoose'),
    cli = require('./libs/cli'),
    createLanes = require('./libs/populate-lanes'),

    dbname = cli('db') || 'scrummie';

mongoose.connect('mongodb://localhost/' + dbname, function (err) {
   if (err) throw err;

   console.log('Connected to ' + dbname);
   var Lanes = createLanes(Lanes);

   //mongoose.disconnect();
});


