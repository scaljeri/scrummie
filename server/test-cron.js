console.log("--------------");
console.dir(Meteor.Cron);
var cron = new Meteor.Cron( {
    events:{
      "* * * * *"  : function () { console.log("OK");}
    }
});
