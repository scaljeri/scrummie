Handlebars.registerHelper('isSelected', function(color, colorIndex) {
    return color.index === colorIndex ? 'selected' : '';
});