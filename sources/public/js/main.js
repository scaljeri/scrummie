$(function () {
    $('body').on('click keydown', function (e) {
                var el, list = App.outsideClick.list;

                if (e.type === 'keydown' && e.keyCode == 27) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].callback(e);
                    }
                } else if (e.type === 'click') {
                    if (!ignoreEvent(e)) {
                        el = $(e.target);

                        for (var i = 0; i < list.length; i++) {
                            if (el.closest(list[i].selector).length === 0) {
                                if (list[i].dirty) {  // only call widgets which are not dirty (just added)
                                    list[i].dirty = false;
                                }
                                else {
                                    list[i].callback(e);
                                }
                            }
                        }
                    }
                }
            }
    );

    function ignoreEvent(e) {
        var i, target = $(e.target);

        for (i in App.ignoreClickFrom.list) {
            if (target.closest(App.ignoreClickFrom.list[i]).length !== 0) {
                return true;
            }
        }

        return false;
    }
});

// http://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=SCRUMMIE

a =
        ['███████╗ ██████╗██████╗ ██╗   ██╗███╗   ███╗███╗   ███╗██╗███████╗',
            '██╔════╝██╔════╝██╔══██╗██║   ██║████╗ ████║████╗ ████║██║██╔════╝',
            '███████╗██║     ██████╔╝██║   ██║██╔████╔██║██╔████╔██║██║█████╗',
            '╚════██║██║     ██╔══██╗██║   ██║██║╚██╔╝██║██║╚██╔╝██║██║██╔══╝',
            '███████║╚██████╗██║  ██║╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║███████╗',
            '╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝╚══════╝'];

a.forEach(function (a) {
    var c = ["color: rgb(68,105,133); background: -webkit-linear-gradient(rgb(99,199,231), rgb(68,105,133)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 3px 3px 0px rgba(0,0,0, .2), 0px 0px 20px rgba(128,190,220, 1.0);"];
    c.unshift('%c' + a);
    console.log.apply(console, c);
    c.shift();
});
