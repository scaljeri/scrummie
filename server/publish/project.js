Meteor.startup(function () {
  Meteor.publish("projects", function (projectId) {
    var projects, query = {};

    if (projectId) {
      query.name = projectId;
    }

    var transform = function (project) {
      var resource = Resources.findOne({_id: project.resourceId});
      if (resource) {
        project.icon = '/uploads/' + resource.fileName;
      }
      return project;
    };

    var self = this;

    var projects = Projects.find(query).observe({
      added: function (document) {
        self.added('projects', document._id, transform(document));
      },
      changed: function (newDocument, oldDocument) {
        self.changed('projects', newDocument._id, transform(newDocument));
      },
      removed: function (oldDocument) {
        self.removed('projects', oldDocument._id);
      }
    });

    self.ready();

    self.onStop(function () {
      projects.stop();
    });
  });
});