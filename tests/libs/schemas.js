var mongoose = require('mongoose'),
    schemas = {
        Tasks: {
            colorId:        {type: 'String', required: true }, // index: true
            description:    {type: 'String', required: true},
            laneId:         {type: 'String', required: true},
            link:           {type: 'String'},
            memberId:       {type: 'String'},
            sprintNumber:   {type: 'Number', required: true},
            title:          {type: 'String'},
            updated:        {type: 'Number', required: true},
            x:              {type: 'Number', required: true},
            y:              {type: 'Number', required: true}
        },
        Lanes: {
            title:          {type: 'String', required: true},
            message:        {type: 'String'},
            index:          {type: 'Number', required: true}
        },
        Sprints: {

        },
        Members: {

        },
        TaskColors: {

        }
    };

module.exports = function (name) {
    return mongoose.model(name, schemas[name]);
};