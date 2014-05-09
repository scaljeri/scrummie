SprintController = RouteController.extend({
    layoutTemplate: 'layout',

    onBeforeAction: function () {
        //console.log("TEAM: " + process.env.TEAM);
        //console.log("SPRINT: " + process.env.SPRINT);
      /*
        var team = this.params.team,
            sprintNumber = this.params.sprint;

        if (App.subs.sprint) {
            App.subs.sprint.stop();
        }
        App.subs.sprint = Meteor.subscribe('sprint', sprintNumber);
        */
      App.page = 'scrumboard';
      App.scrumboard.view = 'normal';
      App.scrumboard.readonly = false;
    },
    waitOn: function () {
        return [App.subs.lanes, App.subs.taskColors]; // TODO: define a list to wait for
    },
    data: function () {  // or a function
        return { pageCls: 'page-scrumboard'};
    },/*

    run: function () {
        this.render() ; // or this.render('scrumboard') (default) or this.render('scrumboard', { data: {..}, waitOn: funct....

        this.render({
            'postShowSidebar': { to: 'sidebar', waitOn: null}
        });
    },
    */
    start: function () {
    },
    action: function () {
        if (this.ready()) {
          this.render('scrumboard');
        }
        else {
          ;//this.render('loading');
        }
    }
});
