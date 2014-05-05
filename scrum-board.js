// Collections
Sprints = new Meteor.Collection('sprints');
Lanes = new Meteor.Collection('lanes');
Tasks = new Meteor.Collection('tasks');
TaskColors = new Meteor.Collection('task-colors');
Members = new Meteor.Collection('members');
Comments = new Meteor.Collection('comments');


// Routes
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});
//RsprintNumberouter.onBeforeAction('notFound');
Router.map(function () {
  this.route('home', {
     path: '/',
     controller: 'SprintController'
    //action: 'start'
  });

  this.route('task', {
     path: '/task/:id',
     controller: 'TaskController'
  });

  this.route('stats', {
      path: '/stats',
      controller: 'StatsController'
  });
});

if (Meteor.isClient) {
  App = {
    noob: function () {},
    scrumboard: {view: 'normal', readonly: false},
    subs: {
      sprint: Meteor.subscribe('sprint'),
      lanes: Meteor.subscribe('lanes'),
      tasks: Meteor.subscribe('tasks'),
      taskColors: Meteor.subscribe('task-colors'),
      taskPositions: Meteor.subscribe('task-positions'),
      members: Meteor.subscribe('members')
    },
    deps: {},
    outsideClick: {
      list: [],
      /*
       When a click is supposed to show a widget, this widget should be ignored when this
       click is handled in the outside-click code. Otherwise this click will show the widget
       and immediately close it again. So, when a widget is shown also set dirty to true

       App.outsideClick.isDirty = true;
       Template.configMenu.show();       // the widget registers itself for an outside-click

       */
      register: function (selector, callback) {
        this.remove(callback);
        this.list.push({ selector: selector, callback: callback, dirty: true});
      },
      remove: function (callback) {
        this.list = _.filter(this.list, function (item) {
          return item.callback !== callback;
        }) || [];
      }
    }
  };
  makeReactive('selectedTask');
  makeReactive('errorMessage');
  makeReactive('selectedColors');
  makeReactive('filterColorId');

  /* PRIVATE HELPER FUNCTIONS */
  function makeReactive(property, defaultValue) {
    var value = null,
      dep = new Deps.Dependency();

    Object.defineProperty(App, property, {
      set: function (newVal) {
        value = newVal || defaultValue;
        dep.changed();
      },
      get: function () {
        dep.depend();
        return value;
      }
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {

/*
     Sprints.remove({});
     Lanes.remove({});
     Tasks.remove({});
     TaskColors.remove({});
     Members.remove({});
     */

    if (Lanes.find({}).count() === 0) {
      Lanes.insert({ title: 'todo', message: 'Tasks to be done', index: 0});
      Lanes.insert({ title: 'in progress', message: 'Tasks in progress', index: 1});
      //Lanes.insert({ title: 'test', message: 'Tasks under test', index: 2});
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

    if (Members.find({}).count() === 0) {
      Members.insert({name: 'Anne Heijkoop', initials: 'AH'});
      Members.insert({name: 'Arjan Eising', initials: 'AE'});
      Members.insert({name: 'Jan Willem', initials: 'JW'});
      Members.insert({name: 'Jeroen Zwartenpoort', initials: 'JZ'});
      Members.insert({name: 'Joost van Dieten', initials: 'JD'});
      Members.insert({name: 'Lucas Calje', initials: 'LC'});
      Members.insert({name: 'Maurice de Chateau', initials: 'MC'});
      Members.insert({name: 'Sander van Geloven', initials: 'SG'});
    }

    Meteor.publish('task-colors', function () {
      return TaskColors.find({}, {sort: {index: 1}});
    });

    Meteor.publish('task-positions', function () {
      return Tasks.find({$or: [{ deleted: {$exists: false}}, {deleted: false}]}, {sort: {updated: 1}, fields: {x: 1, y: 1, updated: 1}});     // only return task positions
    });

    Meteor.publish('tasks', function () {
      return Tasks.find({$or: [{ deleted: {$exists: false}}, {deleted: false}]}, {fields: {x: 0, y: 0, updated: 0}});          // return task without coordinates
    });

    Meteor.publish('lanes', function () {
      return Lanes.find({}, {sort: {index: 1}});
    });

    Meteor.publish('sprint', function (sprintNumber) {

      if (sprintNumber) { // TODO: rename sprintNumber to number in Collection
        return Sprints.find({number: sprintNumber}, {limit: 1, sort: {sprintNumber: -1}});
      }
      else {
        //return Sprints.find({ startDate: {$gt: new Date().getTime()}, endDate: { $lt: new Date().getTime()}});
        return Sprints.find({}, {limit: 1, sort: {sprintNumber: -1}});
      }
    });

    Meteor.publish('members', function () {
      return Members.find({}, {sort: {name: 1}});
    });

    Meteor.publish('comments', function (taskId) {
      console.log("TASK ID=" + taskId);
      return Comments.find({taskId: taskId}, {sort: {insertDate: 1}});
    });

    // stats
    Meteor.publish('velocity', function () {
        return ;
    });

    Meteor.publish('burndown', function () { // stories
        return
    });
    Meteor.publish('burnup', function () {  // tasks
        return
    });
  });
}
