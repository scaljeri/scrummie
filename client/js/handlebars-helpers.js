/*
 <section class="{{scrumboardState}}">
 */
Handlebars.registerHelper('scrumboardView', function () {
    return 'scrumboard--' + App.scrumboard.view;
});
Handlebars.registerHelper('scrumboardState', function () {
    return App.scrumboard.readonly === true ? 'scrumboard--readonly' : '';
});
Handlebars.registerHelper('isReadonly', function () {
    return App.scrumboard.readonly;
});

/*
 {{#each states}}
 <option value="{{this}}" {{selected this ../selectedState}}>{{this}}</option>
 {{/each}}
 */
Handlebars.registerHelper('selected', function (option, value) {
    if (option === value) {
        return ' selected';
    } else {
        return ''
    }
});

// {{allowMultiple task}}
Handlebars.registerHelper('allowMultiple', function (input, color) {
    return input ? '' : 'multiple';
});

// {{isSelected task.color _id}}
Handlebars.registerHelper('isSelected', function (input, color) {
    return input === color ? 'selected' : '';
});

/*
 {{#foreach foo}}
 <div class='{{#if $first}} first{{/if}}{{#if $last}} last{{/if}}'></div>
 {{/foreach}}
 */
Handlebars.registerHelper("foreach", function (arr, options) {
    if (options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function (item, index) {
        item.$index = index;
        item.$first = index === 0;
        item.$last = index === arr.length - 1;
        return options.fn(item);
    }).join('');
});

// {{chartFooter data='{"name":"Buronup", "startDate":"02/10/2014"}'}}
Handlebars.registerHelper('chartFooter', function (options) {
    var dom = '<p class="chart__footer">',
        data = JSON.parse(options.hash.data);

    dom += '<span class="chart__name">' + data.name + '</span>';
    if (data.startDate) {
        dom += '<span class="chart__dates">' + data.startDate + ' - ' + data.endDate + '</span>';
    }

    return new Handlebars.SafeString(dom);
});

Handlebars.registerHelper('taskLink', function (link, taskTitle) {
    var output = {href: link || '/' + App.defaults.project + '/task/' + (taskTitle || '').replace(/ /g, '-')};

    if (link) {
        output.target = '_blank';
    }
    return output;
});

Handlebars.registerHelper('isReadonly', function () {
    return hasPermissionsInProject(App.defaults.project) === null ? 'readonly' : null;
});

Handlebars.registerHelper('isAuthenticated', function () {
    return isAuthenticated();
});

Handlebars.registerHelper('hasPermissionsInProject', function () {
    return hasPermissionsInProject(App.defaults.project);
});

Handlebars.registerHelper('isAuthEnabled', function () {
    return Boolean((Settings.findOne() || {}).isAuth);
});

/*
 Handlebars.registerHelper('if_bool', function() {
 var args = [].slice.apply(arguments);
 var opts = args.pop();

 if (opts) {

 var fn = opts.fn;
 for(var i = 0; i < args.length; ++i) {
 if(args[i])
 continue;
 fn = opts.inverse;
 break;
 }
 return fn(this);
 }
 return null;
 });
 */