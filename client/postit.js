Template.postit.zIndex = function () {
    return this.updated.toString().replace(/^\d{7}/, '');
};

Template.postit.getColor = function () {
    var colors = TaskColors.find({}).fetch(),
        self = this,
        color = _.find(colors, function(color) {
            return color._id === self.color;
        });
    return color ? color.color : '#fff';
}
