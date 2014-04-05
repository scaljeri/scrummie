/*
{{#each states}}
    <option value="{{this}}" {{selected this ../selectedState}}>{{this}}</option>
{{/each}}
*/
Handlebars.registerHelper('selected', function(option, value){
    if (option === value) {
        return ' selected';
    } else {
        return ''
    }
});

// {{allowMultiple task}}
Handlebars.registerHelper('allowMultiple', function(input, color) {
    return input ? '' : 'multiple';
});

// {{isSelected task.color _id}}
Handlebars.registerHelper('isSelected', function(input, color) {
    return input === color ? 'selected' : '';
});

/*
 {{#foreach foo}}
    <div class='{{#if $first}} first{{/if}}{{#if $last}} last{{/if}}'></div>
 {{/foreach}}
 */
Handlebars.registerHelper("foreach",function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function(item,index) {
        item.$index = index;
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
    }).join('');
});