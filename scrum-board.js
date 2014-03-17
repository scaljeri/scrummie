Lanes = new Meteor.Collection('lanes');
Cards = new Meteor.Collection('cards');


if (Meteor.isClient) {
	Meteor.subscribe('lanes');
	Meteor.subscribe('cards');

    Template.scrumboard.lanes = function () {
	    return Lanes.find({}, {sort: {index: 1}}).fetch();
    };

    Template.scrumboard.events = {
        "click .add-post-it": function (e) {
            e.preventDefault();
            // http://www.ericmmartin.com/projects/simplemodal-demos/
            $('.add-post-it--overlay').modal(
                {
                    overlayId: 'overlay--backdrop',
                    containerId: 'add-post-it--overlay',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0',],
                    overlayClose: true,
                    onOpen: open,
                    onClose: close
                }
            );

            function open(d) {
                var self = this;
                self.container = d.container[0];
                d.overlay.fadeIn('slow', function () {
                    $(".add-post-it--overlay", self.container).show();
                    var title = $(".overlay--title", self.container);
                    title.show();
                    d.container.slideDown('slow', function () {
                        setTimeout(function () {
                            var h = $(".overlay--content", self.container).height()
                                + title.height()
                                + 20; // padding
                            d.container.animate(
                                {height: h},
                                200,
                                function () {
                                    $("div.close", self.container).show();
                                    $(".overlay--content", self.container).show();
                                }
                            );
                        }, 300);
                    });
                })
            }
            function close(d) {
                var self = this; // this = SimpleModal object
                d.container.animate(
                    {top:"-" + (d.container.height() + 20)},
                    500,
                    function () {
                        self.close(); // or $.modal.close();
                    }
                );
            }
        }
    };

    Template.scrumcards.cards = function () {
        return Cards.find({}).fetch();
    };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Lanes.find({}).count() === 0) {
        Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
        Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
        Lanes.insert({ title: 'test', message: 'Tasks under test', index: 2});
        Lanes.insert({ title: 'done', message: 'Tasks done', index: 3});
    }
  });
}
