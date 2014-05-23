var error = null;

Template.home.projects = function () {
    return Projects.find({}, {sort: {name: 1}});
};

Template.home.errorMsg = function () {
  return error;
}

Template.home.events = {
    'click [submit-project]': function () {
      var name = $('[project-name]').val(),
          project = Projects.findOne({name: name});

      if (project) {
        App.errorMessage = 'Project already exists';
        $('[error-dialog]').dialog('open');
      }
      else {
        Meteor.call('createProject', {name: name,  created: new Date().getTime()});
      }
      $('[project-name]').val('');
    }
};