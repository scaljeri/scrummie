$(function () {
    $('body').click(function (e) {
        var el, list;

        if (!ignoreEvent(e)) {
            el = $(e.target);
            list = App.outsideClick.list;

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
    });

    function ignoreEvent(e) {
        var i, target = $(e.target);

        for( i in App.ignoreClickFrom.list) {
            if (target.closest(App.ignoreClickFrom.list[i]).length !== 0) {
                return true;
            }
        }

        return false;
    }
});

console.log(' ◢◤◥◤◥◣◥◤◣◤◥◢◣◤◢◥◤◣◤◥◣◤◥◤◣◥◤◣◣◤◢◣◥◤◢◥◢◢◥◤◣◥◣◣◥◢◥◣◥◤◣◤◤◢◣◥◣◥◢◤◥◢◣◢◥◤◥◣◣◥◣◥◤◢◣◤◤◤◢◥');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▇█▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▃▇███▆▕▁▁▃▇████▍▕▁██▍▕▁▃▇█████████▇▃▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂██▕▁▁██▍▕██▍▕▁▁▁▁▁▁██▍▄██▕▁▁▅▃▕▁▁▁▁██▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▄██▕▁▁▁██▍▕██▂▕▁▁▁▁▁▂██▕▁██▍▕▁██▂▕▁▁▂██▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▄▆██▕▁▁▁▁▁██▍▕▁██████████▕▁▁▁██▍▕▁███████▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ ');
console.log('▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██▍▕▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁unconed▕▁▁▁▁▁▁ ');
console.log('◢◤◥◤◢◣◥◤◢◥◣◥◢◥◢◥◢◣◥◥◤◣◥◢◥◣◤◥◤◥◣◥◤◢◣◤◣◢◥◣◥◢◣◥◣◤◢◢◣◤◣◤◢◣◥◣◤◣◤◥◢◥◣◣◤◢◣◥◣◥◣◢◤◢◣◤◢◥◤◥');
