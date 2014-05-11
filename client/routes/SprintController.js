SprintController = RouteController.extend({
    layoutTemplate: 'layout',

    onBeforeAction: function () {
        // Define defaults using the URL
        // http://scrummie.meteor.com?colors=111111,222222&initials=XX
        App.defaults = {};  // reset

        sprint = Sprints.findOne({active: true});

        if (sprint) { // initialize subscriptions which depend on the sprint number
            App.subs.tasks.stop();
            App.subs.tasks = Meteor.subscribe('tasks', sprint.sprintNumber);
            App.subs.taskPositions.stop();
            App.subs.taskPositions = Meteor.subscribe('task-positions', sprint.sprintNumber);
        }

        //window.location.searc
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
            var strs = (window.location.search.match(/([^\?=&]+=[^=&]+)/g)||[]);

            strs.forEach(function (pair) {
                var re, colors, result, splitted = pair.split(/=/);

                if (splitted[0] === 'colors') {
                    App.defaults.colors = [];

                    colors = splitted[1].split(/,/);
                    colors.forEach(function (color) {
                        re = new RegExp(color);
                        result = TaskColors.findOne({$or: [{title: re}, {value: re}] });
                        if (result) {
                            App.defaults.colors.push(result.value);
                        }
                    });
                }
                else if (splitted[0] === 'member') {
                    re = RegExp(splitted[1]);
                    result = Members.findOne({$or: [{name: re}, {initials: re}]});

                    if (result) {
                        App.defaults.member = result._id;
                    }
                }
            });

            this.render('scrumboard');
        }
        else {
          ;//this.render('loading');
        }
    }
});
