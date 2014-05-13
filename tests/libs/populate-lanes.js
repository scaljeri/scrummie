var mongoose = require('mongoose'),
    schemas  = require(__dirname + '/schemas');

module.exports = function (cb) {
    var Lanes = schemas('Lanes');

    Lanes.remove({ index: {$gte: 0}}, function (err) {
        if (err) throw err;

        Lanes.create([
            { title: 'todo', message: 'Tasks to be done', index: 0},
            { title: 'in progress', message: 'Tasks in progress', index: 1},
            { title: 'test', message: 'Tasks under test', index: 2},
            { title: 'done', message: 'Tasks done', index: 1000000}
        ], function (err) {

        //Lanes.create({ title: 'todo', message: 'Tasks to be done', index: 0});
        //Lanes.create({ title: 'in progress', message: 'Tasks in progress', index: 1});
        //Lanes.create({ title: 'test', message: 'Tasks under test', index: 2});
        //Lanes.create({ title: 'done', message: 'Tasks done', index: 1000000})
        })

    });

    return Lanes;
};


