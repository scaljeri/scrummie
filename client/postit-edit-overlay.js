Template.scrummie.openOverlay = function (d) {
    var self = this;
    self.container = d.container[0];
    d.overlay.fadeIn('slow', function () {
        $(".postit-edit--overlay", self.container).show();
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

Template.scrummie.closeOverlay = function (d) {
    var self = this; // this = SimpleModal object
    d.container.animate(
        {top:"-" + (d.container.height() + 20)},
        500,
        function () {
            self.close(); // or $.modal.close();
        }
    );
}

Template['postit-edit--overlay'].events = {
    'click [submit]': function (e, t) {
        this.postit = $(t.find('form')).serializeObject();

        Meteor.call('insertPostit', this.postit);
        /*
        if (this._id) {
            Postits.update(this.postit);
        }
        else {
            Postits.insert(this.postit);
        }
        */
    }
}
