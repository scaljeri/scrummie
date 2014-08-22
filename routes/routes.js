routeSetup();

function routeSetup() {
    var baseUrl = '';
    if (Meteor.isClient) {
        baseUrl = Injected.obj('settings').baseUrl;
    }
    else {
        baseUrl = Meteor.settings.baseUrl || '';
    }

    baseUrl = ('/' + baseUrl).replace(/\/\//g, '/').replace(/\/$/, '');
    console.log("BASEURL = " + baseUrl);

    // Routes
    Router.configure({
        layoutTemplate: 'layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'notFound'
    });

    //RsprintNumberouter.onBeforeAction('notFound');
    Router.map(function () {
        this.route('home', {
            path: baseUrl,
            controller: 'HomeController'
        });
        this.route('project', {
            path: baseUrl + '/:project/',
            controller: 'SprintController'
            //action: 'start'
        });

        this.route('task', {
            path: baseUrl + '/:project/task/:id',
            controller: 'TaskController'
        });

        this.route('stats', {
            path: baseUrl + '/:project/stats',
            controller: 'StatsController'
        });
    });
}
