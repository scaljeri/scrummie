taskFormatter = (function () {
    return {
        columns: 3,
        laneWidth: 33,
        colors: [],
        setup: function (options) {
            this.columns = options.columns || 3;
            this.colors = [];

            if (options.colors) { // cast to IDs
                if (typeof options.colors === 'string') {
                    options.colors = [options.colors];
                }
                for( var i = 0; i < options.colors.length; i++) {
                    this.colors.push(TaskColorsSetup.findOne(query({value: options.colors[i]}))._id);
                }
            }
        },
        formatLane: function (laneId) {
            var tasks = Tasks.find(query({laneId: laneId})).fetch(),
                self = this;

            findAllColors(tasks, this.colors);
//            this.colors = ['hNa5mmExMEepB5qBM', 'jMNR8dACXMTdyn59o'];

            this.laneDim(laneId);
            this.taskDim();
            var taskHeight = this.taskHeight / this.laneHeight * 100,   // in percentage
                taskWidth  = this.taskWidth / this.laneWidth * 100,     // idem
                startX = (this.laneOffset.left + 10) / this.scrumboard * 100,
                startY = (this.laneOffset.top + 170) / this.scrumboard * 100,
                xIncre = (this.laneWidth - 20) / this.columns / this.scrumboard * 100;
                yIncre = 100 * ((this.laneHeight - 10 - this.taskHeight) / (tasks.length / (this.columns * this.colors.length))) / this.laneHeight;

            tasks.sort(dynamicSortMultiple('issue','colorId'));

            var issueId, x = startX, y = startY, columnIndex = 0;
            for( var i = 0; i < tasks.length; i++) {
               if (issueId !== tasks[i].issue) {
                   issueId = tasks[i].issue;
                   x = startX + (i % (this.columns * this.colors.length))/this.colors.length * xIncre;
                   if (i > 0 && (i % (this.columns * this.colors.length)) === 0) {//columnIndex++ === this.columns ) {
                       columnIndex = 0;
                       y += yIncre;
                       x = startX;
                   }
               }
               tasks[i].x = x;
               tasks[i].y = y;
               //console.log('i=' + i + ' x=' + x + ' y=' + y);
               Meteor.call('updatePostitPosition', tasks[i]);
            }





            /*
                startPos = startPos(),
                laneWidth = taskWidth();
                taskWidth = taskWidth(laneWidth/);
                */
        },
        laneDim: function (laneId) {
            var scrumboard = $('[scrumboard]'),
                lanes = scrumboard.find('.lanes');

            this.scrumboard = scrumboard.width();
            this.laneWidth = this.scrumboard / lanes.children().length;
            this.laneHeight = lanes.height();
            this.laneOffset = $('.' + laneId).position();
        },
        taskDim: function () {
            task = $('.postit:first-child');
            return (this.taskWidth = this.taskHeight = task.width());
        }
    };
})();

function dynamicSort(property) {
    return function (obj1,obj2) {
        return obj1[property] > obj2[property] ? 1
            : obj1[property] < obj2[property] ? -1 : 0;
    };
}

function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    };
}

function findAllColors(tasks, colors) {
    for(var i = 0; i < tasks.length; i++) {
        if (colors.indexOf(tasks[i].colorId) === -1) {
            colors.push(tasks[i].colorId);
        }
    }
}
