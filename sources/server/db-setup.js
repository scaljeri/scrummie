dbSetup = function () {
    if (Lanes.find({}).count() === 0) {
        Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
        Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
        Lanes.insert({ title: 'done', message: 'Tasks done', index: 1000000});
    }

    if (Sprints.find({}).count() === 0) {
        /*
         var endDate = new Date(),
         startDate = new Date().setDate(endDate.getDate() + 14);
         Sprints.insert({
         sprintNumber: 23,
         startDate: startDate,
         endDate: endDate.getTime(),
         status: 'started'
         });
         */
    }

    if (TaskColors.find({}).count() === 0) {
        TaskColors.insert({ value: '#ffff92', title: 'Frontend', index: 0});
        TaskColors.insert({ value: '#ffa2e7', title: 'Design', index: 1});
        TaskColors.insert({ value: '#73dcff', title: 'Backend', index: 2});
        TaskColors.insert({ value: '#93e89f', title: 'Unknown', index: 3});
        TaskColors.insert({ value: '#ff9999', title: 'Test', index: 4});
        TaskColors.insert({ value: '#a0a0ff', title: 'other', index: 5});
        TaskColors.insert({ value: '#9effe6', title: 'infra', index: 6});
    }
};
