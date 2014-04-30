Meteor.startup(function () {

var cron = new Meteor.Cron( {
    events:{
      // run at midnight
//      "0 0 * * *"  : function () {
      "* * * * *"  : function () {
        console.log("OK");

        burndown();
        burnup();
      }
    }
});

/*
  The burndown is about stories. Tasks with the same title are grouped together.
*/
function burndown () {

}

/*
  The burnup is about tasks; tasks in: 'TODO', 'DONE' and the total amount of them
*/
function burnup () {
}
});
