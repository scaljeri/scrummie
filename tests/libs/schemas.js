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
            resourceId:     {type: 'String'}
        },
        Tasks: {
            projectId:      {type: 'String', required: true},
            colorId:        {type: 'ObjectId', turnOn: false, required: true}, // index: true
            description:    {type: 'String', required: true},
            laneId:         {type: 'String', required: true},
            link:           {type: 'String'},
            memberId:       {type: 'String'},
            sprintNumber:   {type: 'Number', required: true},
            title:          {type: 'String'},
            updated:        {type: 'Number', required: true},
            x:              {type: 'Number', required: true},
            y:              {type: 'Number', required: true},
            history:        {type: 'Array'} // contains 'title', 'description' and 'updated'
        },
        Lanes: {
            title:          {type: 'String', required: true},
            message:        {type: 'String'},
            index:          {type: 'Number', required: true}
        },
        LanesSetup: {
            projectId:      {type: 'String', required: true},
            laneId:         {type: 'String', required: true},
            index:          {type: 'Number', required: true}
        },
        Sprints: {
            projectId:      {type: 'String', required: true},
            sprintNumber:   {type: 'Number', required: true},
            startdate:      {type: 'Number', required: true},
            enddate:        {type: 'Number', required: true},
            active:         {type: 'Boolean', required: true}

        },
        Members: {
            projectId:      {type: 'String', required: true},
            name:           {type: 'String', required: true},
            initials:       {type: 'String', required: true}
        },
        TaskColors: {
            value:          {type: 'String', required: true},
            title:          {type: 'String', required: true},
            index:          {type: 'Number', required: true}
        },
        TaskColorsSetup: {
           projectId:       {type: 'String', required: true},
           value:           {type: 'String', required: true},
           title:           {type: 'String', required: true},
           index:           {type: 'Number', required: true}
        },
        Resources: {
           fileName:        {type: 'String', required: true},
           originalName:    {type: 'String', required: true}
        },
        History: {
          action:           {type: 'String', required: true},
          created:          {type: 'Number', required: true},
          memberId:         {type: 'ObjectId'},
          object:           {type: 'ObjectId', required: true},
          projectId:        {type: 'ObjectId', required: true},
          sprintId:         {type: 'ObjectId', required: true}
        }
    };

module.exports = function (name) {
    return mongoose.model(name, schemas[name]);
};