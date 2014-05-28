var error = null,
  fileData, fileInfo;

Template.home.projects = function () {
  return Projects.find({}, {sort: {name: 1}});
};

Template.home.errorMsg = function () {
  return error;
};

Template.home.events = {
  'mousedown [submit-project]' : function (e) {
    $(e.target).addClass('btn--active');
  },
  'click [submit-project]': function (e) {
    var name = $('[new-project__name]').val(),
      project;

    $(e.target).removeClass('btn--active');

    if (!name) {
      App.errorMessage = 'A project name is required';
      $('[error-dialog]').dialog('open');
    }

    project = Projects.findOne({name: name});
    if (project) {
      App.errorMessage = 'Project already exists';
      $('[error-dialog]').dialog('open');
    }
    else {
      Meteor.call('createProject', name, fileInfo, fileData, function(err, response) {
        if (response.status === 'error') {
          App.errorMessage = response.msg;
          $('[error-dialog]').dialog('open');
        }
      });
    }
    $('[new-project__name]').val('');
  },
  'change [file-upload]': function (event) {
    var readerPreview = new FileReader(),
        readerBinary  = new FileReader();

    fileInfo   = event.currentTarget.files[0];

    readerPreview.onload = function () {
      $('[file-upload-preview]').attr('src', readerPreview.result);
    };
    readerBinary.onload = function () {
      fileData = readerBinary.result;
    };

    readerPreview.readAsDataURL(fileInfo);
    readerBinary.readAsBinaryString(fileInfo);
  }
};