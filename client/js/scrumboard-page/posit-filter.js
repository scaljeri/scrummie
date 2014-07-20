Template.postitFilter.colors = function () {
    return TaskColorsSetup.find(query(), {sort: {index: 1}}).fetch();
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
            App.filterColorId = TaskColorsSetup.findOne(query({value: select.val()}))._id;
        }
    })
        .on('select2-open', function () {
            App.outsideClick.register('[postit-filter]', hide, true);
        });
};

function hide() {
    $('[postit-filter]').select2('close');
    App.outsideClick.remove(hide);
}

/*
 Template.postitFilter.events = {
 };
 */

function format(color) {
    return ['<span class="select-option-color"',
            'style="background-color:' + color.id + '"></span>',
            '<h3 class="select-option-title">' + color.text + '</h3>'].join('');
}