Template.postit.colors = function () {
};

Template.postit.getColor = function () {
    var colors = TaskColors.find({}).fetch(),
        self = this,
        color = _.find(colors, function(color) {
            return color._id === self.color;
        });
    return color ? color.color : '#fff';
}
