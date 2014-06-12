Template.configMembers.users = function () {
   var project = Projects.findOne();

   if (project) {
        console.log(project);
   }
};