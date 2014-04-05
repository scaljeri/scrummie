window.scrummie = {
    edit: {
        dep: new Deps.Dependency(),
        task: {},   // task used in the edit popover
        createNew: function () {
            this.task = {
                issueId: '',
                title: '',
                description: '',
                color: ''
            };
            this.dep.changed();
        }
    },
    errorMessage: {
        dep: new Deps.Dependency(),
        value: '',
        setValue: function (val) {
            this.value = val;
            this.dep.changed();
        }
    }
};

/*
var edit = {};
var count = 0;

Template.scrummie.created = function () {
    edit.dep = new Deps.Dependency()

};

Template.scrummie.postit = function () {
    edit.dep.depend();
    if (edit.id) {
        edit.postit = Postits.findOne(edit.id);
    }
    else {
        edit.postit = { title: '', index: 0 };
    }

    return edit;
}

Template.scrummie.postits = function () {
    return Postits.find({}, {sort: {index: 1}}).fetch();
};

Template.scrummie.events = {
    'click .add-postit': function (e, t) {
        e.preventDefault();
        edit.id = $(e.target).data('id');
        edit.context = 'new' + (++count);
        edit.dep.changed();

        setTimeout(function () {
            // http://www.ericmmartin.com/projects/simplemodal-demos/
            $('.postit-edit--overlay').modal(
                {
                    overlayId: 'overlay--backdrop',
                    containerId: 'postit-edit--overlay',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65,
                    position: ['0', ],
                    overlayClose: true,
                    onOpen: Template.scrummie.openOverlay,
                    onClose: Template.scrummie.closeOverlay
                }
            );
        },0);
    }
}
*/

