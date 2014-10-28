/*
 # * * * * *  command to execute
 # ┬ ┬ ┬ ┬ ┬
 # │ │ │ │ │
 # │ │ │ │ │
 # │ │ │ │ └───── day of week (0 - 6) (0 to 6 are Sunday to Saturday, or use names; 7 is Sunday, the same as 0)
 # │ │ │ └────────── month (1 - 12)
 # │ │ └─────────────── day of month (1 - 31)
 # │ └──────────────────── hour (0 - 23)
 # └───────────────────────── min (0 - 59)
 */

// https://github.com/percolatestudio/meteor-synced-cron
SyncedCron.add({
    name: 'Crunch some important numbers for the brundown graphs',
    schedule: function(parser) {
        // parser is a later.parse object
        //return parser.text('at 00:00 every weekday')
        //return parser.cron('0 0 * * * ?');
        return parser.cron('* * * * * ?');
    },
    job: function() {
        return true;
    }
});

Meteor.startup(function() {
    SyncedCron.start();
});