var mongoose = require('mongoose'),
    cli = require('./libs/cli'),
    schemas = require('./libs/schemas'),

    dbname = cli('db') || 'scrummie',
    Tasks = schemas('tasks');

mongoose.connect('mongodb://localhost/' + dbname, function (err) {
   if (err) throw err;

   console.log('Connected to ' + dbname);

   mongoose.disconnect();
});


