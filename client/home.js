var error = null,
  fileData, fileInfo;

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
      console.log("IMG DATA " + fileData.length);
      Meteor.call('file-upload', fileInfo, fileData, function(response) {
        debugger;
        Meteor.call('createProject', {name: name, created: new Date().getTime()});
      });
    }
    $('[project-name]').val('');
  },
  'change [project-file]': function (event, template) {
    var reader = new FileReader();
    fileInfo   = event.currentTarget.files[0];

    reader.onload = function (fileLoadEvent) {
      fileData = reader.result;
    };
    reader.readAsBinaryString(fileInfo);
  }
};