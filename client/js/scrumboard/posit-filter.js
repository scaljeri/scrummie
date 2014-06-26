Template.postitFilter.colors = function () {
  return TaskColors.find({}, {sort: {index: 1}}).fetch();
};

Template.postitFilter.rendered = function () {
  var select = $('[postit-filter]');

  select.select2({
    allowClear: true,
    formatResult: format,
    formatSelection: format,
    minimumResultsForSearch: -1,
    placeholder: "All",
    dropdownCssClass: 'postit-filter__dropdown',
    containerCssClass: 'select2-colors',
    width: 150

  });

  select.on('change', function () {
    if (select.val() === '') {
      App.filterColorId = null;
    }
    else {
      App.filterColorId = TaskColorsSetup.findOne({value: select.val()})._id;
    }
  });
};

/*
Template.postitFilter.events = {
};
*/

function format(color) {
  return ['<span class="select-option-color"',
      'style="background-color:' + color.id + '"></span>',
      '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
}