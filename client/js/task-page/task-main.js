Template.taskMain.comments = function () {
  return Comments.find(query({/*TaskID*/}));
};
