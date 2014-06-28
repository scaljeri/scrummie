HomeController = RouteController.extend({
    layoutTemplate: 'layout',
    template: 'home',

    onBeforeAction: function () {
      App.page = 'home';
      App.scrumboard.view = 'normal';
      App.scrumboard.readonly = false;
    },
    waitOn: function () {
        if (App.subs) {
            for (name in App.subs) {
                App.subs[name].stop();
            }
        }

        App.subs = {
            projects: Meteor.subscribe('projects')
        };

        return [App.subs.projects];
    },
    data: function () {  // or a function
        return { pageCls: 'page-scrumboard'};
    },
    /*
    run: function () {
        this.render() ; // or this.render('scrumboard') (default) or this.render('scrumboard', { data: {..}, waitOn: funct....

        this.render({
            'postShowSidebar': { to: 'sidebar', waitOn: null}
        });
    },
    */
    start: function () {
    },
    yieldTemplates: {
        'headerHome': {to: 'header-section'}
    }
    /*
    action: function () {
        if (this.ready()) {
            this.render('home');
            //this.render('headerHome', {to: 'header-section'});
        }
        else {
          ;//this.render('loading');
        }
    }
    */
});
