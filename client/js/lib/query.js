query = function (options) {
    var retVal = {};

    if (typeof(App) !== 'undefined') {
        if(!App.defaults.projectId) {
            App.defaults.projectId = (Projects.findOne({name: App.defaults.project}) || {})._id;
        }
        retVal = $.extend({projectId: App.defaults.projectId}, options);
    }

    return retVal;
};
