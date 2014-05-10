Template.statsOverview.events = {
    'click .clickable-overlay': function (e) {
        console.log("CLICKED");
        var target = $(e.target);
        var container = $('.statistics');
        var item = $(e.target).parent().clone();
        $('svg', item).remove(); // cannot be reused from
        item.append('<svg id="cloned"></svg>');

        item.addClass('cloned-chart');
        item.width(target.width());
        item.height(target.height());
        item.appendTo('body');

        item.position({
            my: "center",
            at: "center",
            of: ".burnup-item"
        });


        // FIX THIS!

        setTimeout(function () {
            item.addClass('fullscreen');

            item.width(container.width());
            item.height(container.height());

            item.position({
                my: "left top",
                at: "left top",
                of: ".statistics"
            });

            setTimeout(function () {
                create('#cloned', item, container);
            },1000);
        }, 100);
    }
}

function create(id, item, container) {
    nv.addGraph(function () {
        var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
            ;

        chart.xAxis     //Chart x-axis settings
            .axisLabel('Time (ms)')
            .tickFormat(d3.format(',r'));

        chart.yAxis     //Chart y-axis settings
            .axisLabel('Voltage (v)')
            .tickFormat(d3.format('.02f'));


        /* Done setting the chart up? Time to render it!*/
        var myData = sinAndCos();   //You need data...

        d3.select(id)    //Select the <svg> element you want to render the chart in.
            .datum(myData)         //Populate the <svg> element with chart data...
            .call(chart);          //Finally, render the chart!

        //Update the chart when window resizes.
        nv.utils.windowResize(function () {
            item.width(container.width());
            item.height(container.height());
            $('.cloned', item).css( {width: container.width(), height: container.height()});
            setTimeout(chart.update,1000);
        });
        return chart;
    });
}
/**************************************
 * Simple test data generator
 */
function sinAndCos() {
    var sin = [], sin2 = [],
        cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
        sin.push({x: i, y: Math.sin(i / 10)});
        sin2.push({x: i, y: Math.sin(i / 10) * 0.25 + 0.5});
        cos.push({x: i, y: .5 * Math.cos(i / 10)});
    }

    //Line chart data should be sent as an array of series objects.
    return [
        {
            values: sin,      //values - represents the array of {x,y} data points
            key: 'Sine Wave', //key  - the name of the series.
            color: '#ff7f0e'  //color - optional: choose your own line color.
        },
        {
            values: cos,
            key: 'Cosine Wave',
            color: '#2ca02c'
        },
        {
            values: sin2,
            key: 'Another sine wave',
            color: '#7777ff',
            area: true      //area - set to true if you want this line to turn into a filled area chart.
        }
    ];
}