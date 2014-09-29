if (Meteor.isClient) {
    App = {
        defaults: {},
        noob: function () {},
        scrumboard: {view: 'normal', readonly: false},
        subs: {},
        deps: {},
        outsideClick: {
            list: [],
            register: function (selector, callback, notDirty) {
                this.remove(callback);
                this.list.push({ selector: selector, callback: callback, dirty: notDirty === undefined ? true : false});
            },
            remove: function (callback) {
                this.list = _.filter(this.list, function (item) {
                    return item.callback !== callback;
                }) || [];
            }
        },
        ignoreClickFrom: {
            list: [],
            add: function (selector) {
                this.list.push(selector);
            }
        },
        settings: Injected.obj('settings')
    };
}

routeSetup();

function routeSetup() {
    var baseUrl = '', urlParts;

    if (Meteor.isClient) {
        baseUrl = App.settings.baseUrl;
    }
    else {
        //var url = Meteor.npmRequire('url'); // TODO use it to replace the regex below
        baseUrl = Meteor.settings.baseUrl || '/';
    }

    /* RegExp alternative:
     var parser = document.createElement('a');
     parser.href = "http://example.com:3000/pathname/?search=test#hash";

     parser.protocol; // => "http:"
     parser.hostname; // => "example.com"
     parser.port;     // => "3000"
     parser.pathname; // => "/pathname/"
     parser.search;   // => "?search=test"
     parser.hash;     // => "#hash"
     parser.host;     // => "example.com:3000"
     */
    urlParts = baseUrl.match(/^(?:.*:\/\/[a-z\-.]+(?::[0-9]+)?)?\/(.*)$/);
    if (urlParts && urlParts.length === 2) {
        baseUrl = urlParts[1];
    }
    baseUrl = ('/' + baseUrl + '/').replace('//', '/');

    // Routes
    Router.configure({
        layoutTemplate: 'layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'notFound'
    });

    Router.map(function () {
        this.route('home', {
            path: baseUrl,
            controller: 'HomeController'
        });
        this.route('project', {
            path: baseUrl + ':project/',
            controller: 'SprintController'
            //action: 'start'
        });

        this.route('task', {
            path: baseUrl + ':project/task/:id',
            controller: 'TaskController'
        });

        this.route('stats', {
            path: baseUrl + ':project/stats',
            controller: 'StatsController'
        });
    });
}
