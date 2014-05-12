var mongoose = require('mongoose'),
    schemas = {
        tasks: {
            colorId: 'String',
            description: 'String',
            laneId: 'String',
            link: 'String',
            memberId: 'String',
            sprintNumber: 'Number',
            title: 'String',
            updated: 'Number',
            x: 'Number',
            y: 'Number'
        },
        lanes: {

        },
        sprints: {

        },
        members: {

        },
        taskColors: {

        }
    };

module.exports = function (name) {
    return mongoose.model(name, schemas[name]);
};