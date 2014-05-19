var mongoose = require('mongoose'),
    /* http://mongoosejs.com/docs/schematypes.html
     String
     Number
     Date
     Buffer
     Boolean
     Mixed
     Objectid: {type: 'ObjectId', turnOn: false} (
     Array
     */
    schemas = {
        Projects: {
            name:           {type: 'String', required: true, index: { unique: true }},
            created:        {type: 'String', required: true},
            description:    {type: 'String'},
            icon:           {type: 'String'}
        },
        Tasks: {
            colorId:        {type: 'ObjectId', turnOn: false, required: true}, // index: true
            description:    {type: 'String', required: true},
            laneId:         {type: 'String', required: true},
            link:           {type: 'String'},
            memberId:       {type: 'String'},
            projectId:        {type: 'String', required: true},
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
        LanesSetup: {
            projectId:        {type: 'String', required: true},
            laneId:         {type: 'String', required: true},
            index:          {type: 'Number', required: true}
        },
        Sprints: {
            projectId:        {type: 'String', required: true}

        },
        Members: {
            projectId:        {type: 'String', required: true},
            name:             {type: 'String', required: true},
            initials:         {type: 'String', required: true}
        },
        TaskColors: {

        },
        TaskColorsSetup: {
           projectId:         {type: 'String', required: true}
        }
    };

module.exports = function (name) {
    return mongoose.model(name, schemas[name]);
};