// console test:
//   $> new Robot('configSprint').start({x: 300, y: 300})
Robot = (function () {
    var SPEED = 2000 / 1000; // 1000px in 1000ms

    var pointer = '<div class="robot"></div>',
        click = '<div class="robot__click"></div>',
        presets = {
            configSprint: {
                steps: [
                    {
                        action: 'moveTo' // init --> mouse position
                    },
                    {
                        action: 'moveTo',
                        coords: '.ui-icon-closethick'
                    },
                    {
                        action: 'click',
                        target: '.ui-icon-closethick'
                    },
                    {
                        action: 'moveTo',
                        coords: '.project-setup'
                    },
                    {
                        action: 'click',
                        target: '[project-setup]'
                    },
                    {
                        action: 'moveTo',
                        coords: '.accordion__item.sprint',
                        correction: {x: -450, y: 0},
                        wait: 500
                    },
                    {
                        action: 'click',
                        target: '.accordion__item.sprint .title'
                    }

                ]
            }
        },
        r = function (preset) {
            this.preset = presets[preset];
        };

    r.prototype.start = function (mouse) {
        var el = $(pointer);
        this.state = 0;

        doStep($(pointer), 0, this.preset.steps, mouse);
    };

    function doStep(el, index, steps, mouse) {
        var step = steps[index];

        if (step) {

            switch (step.action) {
                case 'moveTo':
                    moveTo(el, index, steps, mouse);
                    break;
                case 'click':
                    doClick(el, index, steps);
                    break;
                default:
            }
        }
        else {
            el.remove();
            $('.robot__click').remove();
        }
    }

    function moveTo(el, index, steps, mouse) {
        var dest, x, y, xy,
            coords = steps[index].coords,
            corr = steps[index].correction;

        if (!coords) {
            x = mouse.x;
            y = mouse.y;
        }
        else if (coords.match(/^[\.#]/)) {
            dest = $(coords);
            x = dest.offset().left + dest.innerWidth() / 2 - 5;
            y = dest.offset().top + dest.innerHeight() / 2;
        }
        else if (coords.match(/,/)) {
            xy = coords.split(/,/);
            x = xy[0];
            y = xy[1];
        }

        if (corr) {
            x += corr.x;
            y += corr.y;
        }

        var distance = Math.sqrt(Math.pow(el.offset().left - x, 2) + Math.pow(el.offset().top - y, 2));

        setTimeout(function () {
            el.addClass('robot--pointer')
                .animate({top: y, left: x}, index === 0 ? 0 : distance * SPEED, function () {
                    if (index === 0) {
                        $('body').append(el);
                    }

                    doStep(el, ++index, steps);
                });
        }, steps[index].wait || 0);
    }

    function doClick(el, index, steps) {
        var clickEl, event, coords = el.offset();

        setTimeout(function () {
            el.addClass('robot--pointer');
            clickEl = $('<div>', {
                'class': 'robot__click',
                'css': {top: coords.top, left: coords.left}
            });
            clickEl.appendTo('body');
            clickEl.addClass('robot__click--action');

            setTimeout(function () {
                event = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                $(steps[index].target)[0].dispatchEvent(event);
                doStep(el, ++index, steps)
            }, 300);
        }, 300)
    }

    return r;
})();