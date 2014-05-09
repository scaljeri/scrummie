/*
 Template.burnup.data = function () {
 return {};
 }
 */

Template.burnup.rendered = function () {
  // http://nvd3.org/examples/line.html
  // https://github.com/novus/nvd3/wiki/API-Documentation
  /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
  nv.addGraph(function() {
      var chart = nv.models.lineChart()
              .margin({left: 0, right: 0, top: 10, bottom: 10})  //Adjust chart margins to give the x-axis some breathing room.
              .useInteractiveGuideline(false)  //We want nice looking tooltips and a guideline!
              .transitionDuration(350)  //how fast do you want the lines to transition?
              .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
              .showYAxis(false)        //Show the y-axis
              .showXAxis(false)        //Show the x-axis
          ;

      chart.xAxis     //Chart x-axis settings
          //.axisLabel('Time (ms)')
          .tickFormat(d3.format(',r'));

      chart.yAxis     //Chart y-axis settings
      //.axisLabel('Voltage (v)')

    /* Done setting the chart up? Time to render it!*/
    var myData = sinAndCos();   //You need data...

    d3.select('#burnup')    //Select the <svg> element you want to render the chart in.
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function() { chart.update() });
    return chart;
  });
  /**************************************
   * Simple test data generator
   */
  function sinAndCos() {
    var sin = [],sin2 = [],
      cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/10)});
      sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i/10)});
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
};
